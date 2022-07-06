# 🐝.waggle

An interactive demonstration of the honeybee "waggle dance", presented via a single-page web app.

## Description
The "waggle dance" is a method of communication used by honeybees to indicate the location of a food source to other bees in the hive. It is performed
on a vertical wall and consists of two phases: a straight-line waggle phase, and a return phase in which the bee loops back to the starting position.
The main elements of the waggle dance are its duration and angle, which correspond to the food source's distance from the hive and angle from the sun
respectively.

As an interactive demonstration of the honeybee waggle dance, b.waggle generates an animated path based on user input. The user controls
the angle relative to the sun and the distance (between 200-5000m), indirectly controlling the animated bee's path and speed.

The simulated movement was calculated based on analysis of data collected from honeybees and published in an academic paper (Kohl & Rutschmann, 2021).
The duration of the waggle and return phase are each calculated separately based on their findings. As of this version, the frequency of the "waggle"
and the exact shape of the dance path are not informed by research and are not necessarily accurate.

Built with [jQuery](https://jquery.com) and [Konva](https://konvajs.org).

## Access
This app is currently deployed via Heroku at [b.waggle.herokuapp.com](https://b.waggle.herokuapp.com). Mobile support is not guaranteed.

## References
Kohl, P. L., &amp; Rutschmann, B. (2021). Honey bees communicate distance via non-linear waggle duration functions. PeerJ, 9. https://doi.org/10.7717/peerj.11187 

Tarpy, David. “The Honey Bee Dance Language.” NC State Extension Publications, 23 Feb. 2016, https://content.ces.ncsu.edu/honey-bee-dance-language.

Many thanks to Patrick L. Kohl and Benjamin Rutschmann for their instrumental work.
