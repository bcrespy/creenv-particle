import Particle from "../lib/index";
import Vector from "@creenv/vector";
import Vector2 from "@creenv/vector/vector2";
import Vector3 from "@creenv/vector/vector3";
import BoundingRect from "@creenv/rectangle";


test("initializaion", () => {
  let pos = new Vector(1,1,1),
      pos2 = new Vector2(12,28),
      pos3 = new Vector3(15, -10, 8),
      pos4 = new Vector(10, 20, -10, 5);

  let p = new Particle(pos);
  expect(p.position.dimensions).toBe(3);
  expect(p.position.components).toEqual([1,1,1]);

  let p2 = new Particle(pos2);
  expect(p2.position.dimensions).toBe(2);
  expect(p2.position.components).toEqual([12,28]);

  let p3 = new Particle(pos3);
  expect(p3.position.dimensions).toBe(3);
  expect(p3.position.components).toEqual([15,-10,8]);

  let p4 = new Particle(pos4);
  expect(p4.position.dimensions).toBe(4);
  expect(p4.position.components).toEqual([10,20,-10,5]);
});


test("update cycle", () => {
  let pos = new Vector(0,0,0);
  let velo = new Vector(0,1,0);

  let p = new Particle(pos, velo);
  expect(p.position.components).toEqual([0,0,0]);
  expect(p.velocity.components).toEqual([0,1,0]);
  expect(p.acceleration.components).toEqual([0,0,0]);

  p.update();
  expect(p.position.components).toEqual([0,1,0]);
  expect(p.velocity.components).toEqual([0,1,0]);
  expect(p.acceleration.components).toEqual([0,0,0]);
  expect(pos.components).toEqual([0,1,0]);

  p.update();
  expect(p.position.components).toEqual([0,2,0]);
  expect(p.velocity.components).toEqual([0,1,0]);
  expect(p.acceleration.components).toEqual([0,0,0]);

  p.applyForce(new Vector(15,0,-8));
  expect(p.acceleration.components).toEqual([15,0,-8]);
  p.update();
  expect(p.position.components).toEqual([15,3,-8]);
  expect(p.velocity.components).toEqual([15,1,-8]);
  expect(p.acceleration.components).toEqual([0,0,-0]);
});

test("bounding rect", () => {
  let pos = new Vector(0,0,0),
      velo = new Vector(500,500,500);
  let p = new Particle(pos, velo);

  expect(p.update()).toBe(true);

  pos = new Vector(0,0,0);
  velo = new Vector(500,500,500);
  let rect = new BoundingRect(new Vector(-50,-50-50), new Vector(50,50,50));
  p = new Particle(pos, velo, new Vector(0,0,0), 1, rect);
  expect(rect.contains(pos)).toBe(true);
  expect(p.update()).toBe(false);
})