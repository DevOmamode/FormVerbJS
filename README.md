# FormVerb.JS

So, you've just stumbled on **FormVerb.JS**? Well, congratulations buddy. You've just discovered a way of making your dev life easier working with HTML forms in JavaScript. 

**FormVerb.JS** is a powerful yet simple and lightweight JavaScript library that enables you work with HTML forms and their elements (inputs, textareas, selects, etc). It takes away the hassle of writing bunch of codes in order to access your form elements and allows you to focus on doing something with the values of your form elements.

How? Well, with **FormVerb.JS**, instead of individually querying each form element in order to access and use its value when the submit button is clicked, **FormVerb.JS** provides you with an HTTP verb object such as GET, POST, PUT, PATCH, DELETE (depending on your form method) where you can access the values of your form elements when the form submits. For example, 
**Normal JavaScript**
```javascript
async function mySubmitFunc(){
let username = document.querySelector("#username");
//This can become overwhelming for a form with lots of input elements
alert(username);
}
```
**With FormVerb.JS**
```javascript
async function mySubmitFunc(){
alert(POST["username"]); //if form method is POST
}
```
So, you see how cool it can get right? Please don't forget to give this repo a star ⭐

## Background
In this software development journey, one thing I had always wished for in JS is the ability to submit my forms and have HTTP verb variables in JS that enable me to access the form elements' values. Just as I would do in a typical PHP form submit environment with $_GET,  $_POST, etc. 🥰
Looking at how this can simplify the form handling process, I decided to bundle a couple of JS codes to achieve this and voila, I guess it is a success😅

## Getting Started
To quickly get started using **FormVerb.JS**, follow the below installation instructions. 

### Using NPM
*This is not yet available.*

### Using <Script> Tag
To quickly get **FormVerb.JS** into your project using the <script> tag, kindly follow the below steps, 
1. Download this repository in a Zip format and extract where your JavaScript files live in your project. 
Alternatively, you can download the formverb.js file in the **src** folder of this repo and place anywhere in your project. 
2. Bring in the path to the file in the head section of your HTML file where you will be using it. E.g, 
```html
<script src="js/formverbjs/src/formverb.js"></script>

<!-- OR -->

<script src="path-to-the-file/formverb.js"></script> <!-- If you used the alternative method. -->
```
Congrats, FormVerb.JS is now in your project. Let's get to using it. 

## Your First FormVerb.JS Form
Now, let's create an HTML form that uses **FormVerb.JS**, 
```html
<!-- Remember to include your FormVerb.JS script -->
<form method="POST" action="formverbjs">
<input type="text" name="username"/>
<input type="password" name="password"/>
<button name="sbtn" type="submit" **submit="myFunc()">Log In</button>
</form>
<!-- JavaScript -->
<script>
async function myFunc(){
if (POST["sbtn"] && POST["sbtn"] === true){
//The above checks if the form has been submitted though not really necessary since FormVerbJS only calls this function when the submit button is clicked but this check can also ensure your submit logic doesn't run especially if the function is called from somewhere else in your code
alert(POST["username"]);
alert(POST["password"]);
} 
}
</script>
```
### Explanation
1. You include your **FormVerb.JS** library file in the head section of your HTML file using the <script> tag. 
2. Create a <form> element. Some very important attribute for this <form> element in order for **FormVerb.JS** to work with it are, 
a. **method**: This specifies the form method and the value can be any of GET, POST, PATCH, PUT, DELETE. 
b. **action**: The value of this must be **formverbjs** else **FormVerb.JS** won't work with the form element. 
3. Then, your input elements in the <form> element. Your input element can include <input>, <select>, <textarea>, <progress>, <meter>. **FormVerb.JS** supports practically all HTML5 input types including radio, checkbox, etc.
**NOTE:** All elements should have at least a **name attribute (preferred)** or **id attribute**. These attributes should be unique except the name attribute for input elements of type radio or checkbox where a set of related radio or checkbox elements must have same name e.g radio elements for gender or checkbox elements for menu-list.
4. Finally, a submit button. This is the button that submits your form when clicked. Whether it is a button or a or span element, the submit button should just have the following attributes for it to work, 
a. **type**: its value should be "submit".
b. ** **submit**: this attribute should contain the name or definition of a function to be called when the form submits. For example,
```html
<!-- name of a function to call (recommended) -->
<button type="submit" **submit="myFunc">Submit</button>

<!-- OR -->
<!-- direct function definition -->
<button type="submit" **submit="() => { alert(POST); }">Submit<button>
<button type="submit" **submit="function (){ myFunc(1); }">Submit</button>
```
5. Voila, you have successfully set up your form to use **FormVerb.JS**. You can now access your form elements' values in your submit handler function. 
**Note:** if you didn't specify a form method or your form method is GET, your form elements will be available in the GET global object variable else if your form method is POST, the form elements will be available in the POST global object variable, and same applies to PUT, PATCH, DELETE form methods.

## Elements' Values
Except for (select elements, input elements of type checkbox or radio), all other elements will return their value in the default HTML string format. 
For <select> elements with the HTML **multiple** attribute, it will return an array containing the values of selected options. 
Also, for **input elements** of type radio, the value returned will be an array containing the value and the DOM object of the element that was checked or chosen among a group of related (related by name attribute) radio buttons. It will return **null** if none of these radio buttons was checked.
Finally, for **input elements** of type checkbox, the value returned will be an array containing [whether an element was checked, its value, and the DOM object] for each of the related elements (related by name attribute). These help you to know which radio or checkbox elements were checked.
