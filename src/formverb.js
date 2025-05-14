/*
FormVerb.JS - Version 1.0.0 (Initial Release)

FormVerb.JS is a lightweight JavaScript library that enables you to easily work with forms and their elements.
The library takes away the hassle of writing bunch of codes trying to access various form elements, provides you with HTTP verbs (GET, POST, PATCH, PUT, DELETE - depending on the form method attribute) and allows you concentrate on making good use of your form values.

It is as simple as that!
*/
var POST = {}, GET = {}, PATCH = {}, PUT = {}, DELETE = {};

window.onload = function(){
    prepareFormVerbJSForms(1);
};

function prepareFormVerbJSForms(init){
    const forms = document.querySelectorAll("form");
    forms.forEach(prepareFormVerbJSForm);
    
    function prepareFormVerbJSForm(form){
        if (form.getAttribute("action").toLowerCase() !== "formverbjs"){
            return;
        }

        let method = form.getAttribute("method") ?? "GET";

        method = (method == ""? "GET" : method);
        
        let inputs = form.querySelectorAll("input:not([type=submit]), textarea:not([type=submit]), select:not([type=submit]), progress:not([type=submit]), meter:not([type=submit])");
        inputs.forEach(input => {prepareFormVerbJSInput(input, method)});
        
        let submits = form.querySelectorAll("[type=submit]");
        submits.forEach(submit => {prepareFormVerbJSInput(submit, method, (init === 1? false : true))});
        
        if (init === 1){
        submits.forEach(prepareSubmitsFormVerbJS);
        }
    }
    
    function prepareFormVerbJSInput(input, method, defaultValue = undefined){
        method = method.toUpperCase();
        const id = input.getAttribute("id"), name = input.getAttribute("name"), tag = input.tagName.toLowerCase();
        
        let value;
        
        if (tag === "select"){
            if (input.type.toLowerCase() === "select-multiple"){
                value = Array.from(input.selectedOptions).map(option => option.value);
            }else{
                value = input.value;
            }
        }else if (input.type === "checkbox"){
                if (name === null){
                    value = [input.checked, input.value, input];
                }else{
                    let elements = document.querySelectorAll(`input[type=checkbox][name=${name}]`);
                    value = Array.from(elements).map(element => [element.checked, element.value, element]);
                }
        }else if (input.type === "radio"){
            if (name === null){
                if (input.checked){
                value = [input.value, input];
                }else{
                    value = null;
                }
            }else{
                let elements = document.querySelectorAll(`input[type=radio][name=${name}]`);
                value = null;
                elements.forEach(element => {
                    if (element.checked){
                        value = [element.value, element];
                    }
                });
         }
        }else{
            value = (defaultValue !== undefined? defaultValue : input.value);
        }
        
        if (name === null && id === null){
            return;
        }
        if (name !== null){
            if (window[method] !== undefined){
            window[method][name] = value;
            }
        }else{
            if (window[method] !== undefined){
            window[method][id] = value;
            }
        }
    }
}

function prepareSubmitsFormVerbJS(submit){
    submit.addEventListener("click", handleSubmitFormVerbJS);
}
    
async function handleSubmitFormVerbJS(e){
    e.preventDefault();
    await prepareFormVerbJSForms(0);
    let onSubmitCallback = this.getAttribute("**submit");
    if (onSubmitCallback !== null && onSubmitCallback !== undefined){
        if (typeof window[onSubmitCallback] === "function"){
            window[onSubmitCallback]();
        }else{
            try{
            onSubmitCallback = eval(`(${onSubmitCallback})`);
            if (typeof onSubmitCallback === "function"){
                onSubmitCallback();
            }else{
                console.log("Invalid function passed to FormVerb.JS **submit attribute.");
            }
        }catch (e){
            console.log(e);
        }
      }
    }
}