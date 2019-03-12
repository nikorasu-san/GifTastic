# GifTastic
Objective: create a web app that pulls from Giphy's API

## Overview
This is a simple web app that uses the Giphy API upon a button push. My theme for default images are tv shows and movies.

## Instructions
1. Use any of the default buttons on the top of the screen to pull 10 new images from Giphy API.
2. With every push, the site will load 10 more images. The images from the most recent button click will appear at the top of the pack.
3. The controls on the right hand side can be used to clear the current gif results or add a new button for use.
4. To add a new button, enter a search term into the blank field and click "add button."

## Tech used/ Shout-outs
* Giphy API (https://developers.giphy.com)


## Future Recommendations
* I struggled with finding a solution that would persistently keep track of which button was clicked and only offset results when said button was click more than once. I believe there could be a sessionStorage solution that would work in this case, but I also hoped to find a simpler solution.