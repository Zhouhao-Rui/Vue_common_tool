# Vue-lazyLoad

## Requirements

to realize a mock vue-lazyload which refs to https://github.com/hilongjw/vue-lazyload.

The basic functions is to load the images in the fixed viewport, and then require new resources when scrolling down the screen.

## How to use

it has the following options when configuring the plugin:

- preload: preload height for showing resources.
- error: shows the error image when loading not found resources.
- loading: shows the loading gif...

it configures the images to be lazy-loading mode with v-lazy directives.

## example

![Lazy Load](./doc/lazyload.png)
