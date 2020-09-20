---
title: Photogrammetry
date: 2020-09-18
tags: photography, measurement, existing conditions
---

[Meshroom](https://meshroom-manual.readthedocs.io/en/latest/index.html) is free and [well-documented](https://blog.prusaprinters.org/photogrammetry-2-3d-scanning-simpler-better-than-ever_29393/) but it only works if you have an NVIDIA graphics card (most Macs don't).

Other tools:

- [OpenDroneMap (ODM)](https://github.com/OpenDroneMap/ODM) command-line tool for making pointclouds and textured meshes from aerial imagery. GUI version maintained at [WebODM](https://github.com/OpenDroneMap/WebODM)
- [OpenMVG](https://github.com/openMVG/openMVG) library for multiple view geometry processing
- [MVStudio](https://github.com/LiangliangNan/MVStudio) GUI tool, has to be compiled by user
- [OpenMVS](https://github.com/cdcseacave/openMVS) GUI
- [COLMAP](https://colmap.github.io/install.html)
- [VisualSFM](http://ccwu.me/vsfm/)
- [Regard3d]() runs on Mac, quick and easy for small photo sets

## Overview

A great prcedent is [@artfletch](https://twitter.com/artfletch)'s [model](https://sketchfab.com/3d-models/southbank-undercroft-skatepark-add37d5dc6a2456eb0d7607c6fbd884d) of the Southbank Skatepark in London. This was made from 2773 photos from a Sony a6000 using Autodesk Reality Capture.

## WebODM

Follow the instructions [here](https://github.com/OpenDroneMap/WebODM) to get started. You need to clone the WebODM git repo and then run a script to install. Once the container is up, you can access WebODM at [localhost:8000](http://localhost:8000).

Using the web interface, you can upload batches of images and process them to get georeferenced point clouds and textured meshes. 

Isaac Ullah of San Diego State has a good tutorial on [YouTube](https://www.youtube.com/watch?v=0zVtZxWyBsw).

## Meshroom

is built on top of AliceVision

https://medium.com/realities-io/getting-started-with-photogrammetry-d0a6ee40cb72

