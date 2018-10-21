/**
 * @license MIT
 * @author Baptiste Crespy <baptiste.crespy@gmail.com>
 * 
 * @creenv/particle is a lightweight javascript library designed to handle 
 * particle operations within the Creative Environment. It handles any
 * n-dimensions Vector as long as it's a vector from @creenv/vector.
 * Some basic physics is implemented within this class, it you have suggestions 
 * about any possible amelioration feel free to contribute to 
 * the project :) 
 **/

import Vector from "@creenv/vector";
import BoundingRect from "@creenv/rectangle";

class Particle {
  /**
   * a particle of any n-dimensions. the first argument vector dismensions will 
   * be the Particle dimensions.
   * 
   * @param {?Vector} position the starting position of the particle
   * @param {?Vector} velocity the starting velocity of the vector
   * @param {?Vector} acceleration the starting acceleration of the vector
   * @param {?number} mass the mass of the particle. will be used to divide the 
   *                  force applied with applyForce(). (default = 1)
   * @param {?BoundingRect} boundingRect if specified, the update method will 
   *                        check if the position is still within the rect, and
   *                        return false if it's not 
   */
  constructor (position = new Vector(0,0,0), velocity = new Vector(0,0,0), acceleration = new Vector(0,0,0), mass = 1, boundingRect = null) {
    /**
     * the position of the particle in **unit** (you pick the unit)
     * @type {Vector}
     * @public
     */
    this.position = position;

    /**
     * the velocity of the particle, in **units** / frame
     * @type {Vector}
     * @public
     */
    this.velocity = velocity;

    /**
     * the acceleration of the particle, in **units** /frame. is set to 0 at 
     * each update() call, can be increased using applyForce()
     * @type {Vector}
     * @public 
     */
    this.acceleration = acceleration;

    /**
     * the mass of the particle 
     * @type {number}
     * @public
     */
    this.mass = mass;

    /**
     * the container of the particle
     * @type {BoundingRect}
     * @public
     */
    this.boundingRect = boundingRect;

    if (boundingRect) {
      this.update = this.updateCheck;
    }
  }

  /**
   * applies a force, divided by mass, to the acceleration. after each update() 
   * call, the acceleration is set to 0
   * 
   * @param {Vector} force the force to apply
   */
  applyForce (force) {
    this.acceleration.addVector(force.copy().divideScalar(this.mass));
  }

  /**
   * updates the particle position given the velocity and acceleration.
   * acceleration is set to 0 after this 
   * 
   * @return {boolean} if boudingRect is specified, will test if the position is
   * still within the rect after the update and return false if it's not 
   */
  update () {
    this.velocity.addVector(this.acceleration);
    this.position.addVector(this.velocity);
    this.acceleration.multiplyScalar(0);
    return true;
  }

  /**
   * will update and then check if the point is contained within the bounding 
   * rect. this method doesn't call update because update is redefined if a
   * bounding rect is specified 
   */
  updateCheck () {
    this.velocity.addVector(this.acceleration);
    this.position.addVector(this.velocity);
    this.acceleration.multiplyScalar(0);
    return this.boundingRect.contains(this.position);
  }
};

export default Particle;