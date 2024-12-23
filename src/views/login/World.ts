/**
 * @Author: wangbo 3812943352@qq.com
 * @Date: 2024-12-17 16:33:07
 * @LastEditors: wangbo 3812943352@qq.com
 * @LastEditTime: 2024-12-17 17:17:02
 * @FilePath: src/javascript/Experience/World.js
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import Experience from './Experience.js'
import Gradient from './Gradient.js'
import Smoke from './Smoke.js'
import Particles from './Particles.js'
import Vignette from './Vignette.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setGradient()
                this.setSmoke()
                this.setVignette()
                this.setParticles()
            }
        })
    }

    setGradient()
    {
        this.gradient = new Gradient()
    }

    setSmoke()
    {
        this.smoke = new Smoke()
    }

    setParticles()
    {
        this.particles = new Particles()
    }

    setVignette()
    {
        this.vignette = new Vignette()
    }

    resize()
    {
        if(this.smoke)
            this.smoke.resize()
    }

    update()
    {
        if(this.gradient)
            this.gradient.update()

        if(this.smoke)
            this.smoke.update()

        if(this.particles)
            this.particles.update()
    }

    destroy()
    {
    }
}