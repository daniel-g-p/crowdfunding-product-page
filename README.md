# Crowdfund - Crowdfunding Product Page

![Crowdfund](https://github.com/daniel-g-p/crowdfunding-product-page/blob/main/cover_image.PNG)

Crowdfund is a simple web page that showcases the product of a startup and simulates an experience where users can choose different ways to back the project with financial support. It is based on a challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR) and the live site can be accessed [here](https://crowdfunding-product-page-daniel-g-p.vercel.app/)

## Table of Contents

1. [Motivation](#motivation)
2. [Technologies](#technologies)
3. [Features](#features)
4. [Project Status](#project-status)
5. [References](#references)

## Motivation

By tackling this challenge, my main goal was to practice using DOM events as well as form handling in JavaScript, as the project includes multiple instances of both concepts.

## Technologies

### HTML, CSS, JAVASCRIPT

This project was built responsively with HTML, CSS, and JS in their purest form. The design attempts to replicate the template provided by the challenge as closely as possible.
THe main challenge was to handle user inputs cleanly, which implied many things from validating inputs, over creating custom radio buttons, all the way to taking the user input and dynamically using it to update the page.

### Vercel

In order to deploy the project, I used the free hosting platform Vercel.

## Features

### Pledge Option Selection

Users have multiple ways of selecting an option from the list available: They can either open the selection modal to choose manually by clicking the "Back this project button", or they can go to the bottom section of the page to choose an option there and have it automatically selected when the selection modal appears.

### Pledge Amount Input

Depending on the option chosen, there are different minimum requirements for the pledge that a user has to enter, and this is handled with front end form validation in JS. Whenever a valid value is submitted, both the project statistics as well as the stock levels are updated in the DOM.

## Project Status

Realitically speaking, there is little use of this simulation in a real situation, but I may pick the concept up again once I build a payment gateway further down the line, possibly using a tool of the likes of Stripe.

## References

* Custom Radio Button Tutorial: https://www.youtube.com/watch?v=5K7JefKDa4s&t=94s
* Frontend Mentor Challenge: https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR
