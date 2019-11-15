console.log('Hello World!');

const form = document.querySelector('form');
const block1 = document.getElementById('block-1');
const block2 = document.getElementById('block-2');
const block3 = document.getElementById('block-3');
const text1 = document.getElementById('text-1');
const text2 = document.getElementById('text-2');

block2.style.display = "none";
block3.style.display = "none";

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const age = formData.get('age');
    const email = formData.get('email');

    const formObj = {
        name,
        age,
        email
    };
    console.log(formObj);

    sendInfo(formObj);
});

async function sendInfo(info) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    };
    try {
        const response = await fetch("/form-handler", options);
        const data = await response.json();
        console.log(data);
        if (data.status == "success") {
            console.log("I am Happy!!");

            block1.style.display = "none";
            block2.style.display = "block";
            block3.style.display = "none";

            text1.innerText = `Thank you ${info.name} whose age is ${info.age} for participating in this form!!`;
            text2.innerText = `We will send you an email at ${info.email} shortly...`;
        } else {
            return error;
        }
    } catch (error) {
        console.error(error);

        block1.style.display = "none";
        block2.style.display = "none";
        block3.style.display = "block";
    }
}