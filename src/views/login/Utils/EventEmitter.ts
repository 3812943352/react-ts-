/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-17 16:33:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-18 13:25:54
 * @FilePath: src/views/login/EventEmitter.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
export default class {
  callbacks: any;

  /**
   * Constructor
   */
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  /**
   * On
   */
  on(_names: any, callback: any) {
    const that = this;

    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return false;
    }

    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach(function (_name: any) {
      // Resolve name
      const name = that.resolveName(_name);

      // Create namespace if not exist
      if (!(that.callbacks[name.namespace] instanceof Object))
        that.callbacks[name.namespace] = {};

      // Create callback if not exist
      if (
        !(that.callbacks[name.namespace][name.value] instanceof Array)
      )
        that.callbacks[name.namespace][name.value] = [];

      // Add callback
      that.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  /**
   * Off
   */
  off(_names: any) {
    const that = this;

    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach(function (_name: any) {
      // Resolve name
      const name = that.resolveName(_name);

      // Remove namespace
      if (name.namespace !== "base" && name.value === "") {
        delete that.callbacks[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === "base") {
          // Try to remove from each namespace
          for (const namespace in that.callbacks) {
            if (
              that.callbacks[namespace] instanceof Object &&
              that.callbacks[namespace][name.value] instanceof Array
            ) {
              delete that.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(that.callbacks[namespace]).length === 0)
                delete that.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (
          that.callbacks[name.namespace] instanceof Object &&
          that.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete that.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (
            Object.keys(that.callbacks[name.namespace]).length === 0
          )
            delete that.callbacks[name.namespace];
        }
      }
    });

    return this;
  }

  /**
   * Trigger
   */
  trigger(_name: any, _args: any) {
    // Errors
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }

    const that = this;
    let finalResult: any = null;
    let result = null;

    // Default args
    const args = !(_args instanceof Array) ? [] : _args;

    // Resolve names (should on have one event)
    let name = this.resolveNames(_name);

    // Resolve name
    name = this.resolveName(name[0]);

    // Default namespace
    if (name.namespace === "base") {
      // Try to find callback in each namespace
      for (const namespace in that.callbacks) {
        if (
          that.callbacks[namespace] instanceof Object &&
          that.callbacks[namespace][name.value] instanceof Array
        ) {
          that.callbacks[namespace][name.value].forEach(function (
            callback: any,
          ) {
            result = callback.apply(that, args);

            if (typeof finalResult === "undefined") {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === "") {
        console.warn("wrong name");
        return this;
      }

      that.callbacks[name.namespace][name.value].forEach(
        function (callback) {
          result = callback.apply(that, args);

          if (typeof finalResult === "undefined")
            finalResult = result;
        },
      );
    }

    return finalResult;
  }

  /**
   * Resolve names
   */
  resolveNames(_names: any) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    names = names.split(" ");

    return names;
  }

  /**
   * Resolve name
   */
  resolveName(name: any) {
    const newName = {};
    const parts = name.split(".");

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = "base"; // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }

    return newName;
  }
}
