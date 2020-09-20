---
title: Rhino-Blender Workflow for Rendering
slug: /tools/blender/blender
---

## In Rhino

Establish your units and origin. When working with urban-scale data in the US, you'll likely want to use Feet and the 0,0 point of the appropriate State Plane Projected Coordinate System (see section on projections within GIS). This allows you to continue adding in georeferenced geometry at any time throughout the modeling process.

There are two ways to handle layering/separation in the Rhino-Blender interchange. You can either use Rhino's layers, or object names. If you use object names, anything without a name will be imported separately as an unlabeled mesh or curve. This preference is set in the OBJ export dialog.

Then, use the Export Selected dialog and choose either:

- OBJ export. For geometry
- COLLADA export. For scene objects like cameras and lights. Named views can be exported as cameras by setting an open viewport to the view before export.

## In Blender

- Set your scene units and "length" under Scene/Units to be the same as your Rhino model.
- Use either Import/Collada or Import/OBJ to bring in geometry or scene objects.
- For very large files you may have to adjust the clipping boundaries for both the 3D view and camera before geometry will display.
- Named objects will be imported as separate objects in the scene hierarchy according to their name. If more than one object has the same name, Blender will append a .00x serial number to it. You can search/select objects using a wildcard search to achieve a layer-like effect.
- Named views that are open as viewports at the time of export are imported as cameras. Zoom and aspect ratio are not preserved. Warning - if the view is changed in Rhino after the Named View is set, but before Export, the modified view will show up in Blender as a Camera just the same as if you had exported the unmodified Named View. Be careful!
- Axes: for everything to line up with the default COLLADA, the OBJ axis settings should be as follows: in Rhino, make sure "Map Rhino Z to OBJ Y is checked", then in Blender the default OBJ import settings should work.
- Transform for GIS-derived data (see above). Establish a "project origin" within the state-plane coordinate system. Create an Empty object named Transform, with its location set to the negative x and y values of the project origin (if your project is at 1013275', 251867' in State Plane XY, set the Empty's location to -1013275 (X) etc..). For all geometry in the Blender scene, parent it to the Transform. Doing so will position the geometry at the center of the Blender scene. When importing new geometry, you'll need to both set the parent and "Clear Origin" to apply the transform. Finally, apply the transform by Clear Parent (and keep transformation) and apply all transformations.

## Making Changes

As long as you continue to use the same units, origin, and layering/separation strategy, you can continue to bring objects back and forth between Rhino and Blender through the methods described above indefinitely.

---

## Cycles Black Corners Problem

Ussing a diffuse BDSF shader, you'll sometimes get black bands along the interior corners of your model, like this:
![black-bands](../00_images/20190314_blender-black-bands.png)

As a workaround, mix the diffuse shader with an emission shader of the same color.d

In Cycles, and especially when using Freestyle, a lot of problems are created by bad mesh topology. A long, tall quad will often render with errors, but if you split it into tris where the bounding box dimensions are closer to a 1:1 ratio it will perform better. Take this into account when exporting geometry from Rhino, as you have control over the type of mesh it generates there as well.

## Materials

in collada, blender will create a separate material for each instance, this isn't what you want. workaround: delete material instances in dae file?
run library/code/python/blender_py/blender_mergematerials.py.
you have to make sure all of the materials have UNIQUE names in rhino, though or it won't work. after this, all the materials will  be merged. ** they also can't have any periods in the material names!

## General Note on Import/Export to Blender

3d interchange files fall under two broad categories: scene files and object files. COLLADA, 3ds and similar will include lights, cameras and possibly object grouping/hierarchy while formats like PLY will contain geometry only. In different use cases, either may be desirable, for example your initial import could be in 3ds in order to capture named views (as cameras) and then subsequent updates to geometry or additions could come in as PLY.

## box mapping for procedural textures

the image texture node has a box option, but for the procedural brick texture there is no such option. A workaround is described here:
https://blenderartists.org/t/box-mapping-for-procedural-brick-texture-in-cycles/1124072
The basic premise involves using projection uvs to mask x y and z faces of the rendered object and apply texture accordingly...

## units

experiment on the box mapping setup above, may also apply to other situations

- resolution of the image doesn't matter
- aspect ratio probably does? (untested)
- 100x100 and 1000x1000 versions of the same image perform the same
- with the units setup and box projection setup provided as a custom material
  - 1' maps to the square image in a 1:1 way when mapping texture scale is set to ~0.305
  - this is not precise
  - the reason for this is 1' = 0.3048 meters
  - 'blender units' are equivalent to meters
  - even when you set the scene units to imperial, unscaled units in the blender UI still have to be manually scaled

## outdoor lighting with hdr sky

see environment texture setup in example file
to reduce noise in render, set glossy filter in light paths to 1
clamp indirect to 1
multiple importance to 2000

## volumetric cloud

https://www.youtube.com/watch?v=90wsacQJJoo
o + scroll wheel when in edit mode and moving vertices - variable range for modification effect
light paths - volume - change to zero (already default, but in case, gets rid of noise/fireflies?)

## compositing

https://www.youtube.com/watch?v=25N775uHb_4
f3 to save image
it's under the node editor, switch from shader or texture
to get the image to show up as backdrop, click the backdrop check box, also make sure under render, post processing that only compositing is selected and not sequencer
need to connect image to viewer node

## import rhino to blender

https://www.youtube.com/watch?v=aikDTOcwFsE
make sure everything has a material
export as obj
under naming, do not export object names, layers as OBJ groups
set origin, origin to geometry

## creating photorealistic trees

https://www.youtube.com/watch?v=mGFGuL8bfdI&t=706s
convert to mesh alt + c before unwrap...
shift + space hides all except active (toggles)

## volumetric lighting

https://www.youtube.com/watch?v=AXjE-t6dFZ8
GPU-INTENSIVE!
set up normal lighting
create a cube or other geometry with volumetric material that encompasses the scene, adjust material density
to alter effect.
option: musgrave texture for variable noise (cool!)
plus absorption (also in the material )
plane lighting with a texture - holes in a surface etc.

## blender render speed

https://www.blenderguru.com/articles/4-easy-ways-to-speed-up-cycles/
always use gpu render
reduce bounces (usually don't need more than 4)
gpu tile size - 256x256
reduced number of samples (start low, only increase if it makes a difference)
