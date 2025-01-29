/* TO MAKE SURE I GOT ALL THE REQUIREMENTS I ADDED THE BULLET POINTS AS COMMENTS 
- ALL COMMENTS FROM REQUIREMENTS ARE IN QUOTES ("") */


// "Access timezone data in timezones.data in Javascript, so you can get an object 
// in Javascript (similar to a dictionary in Python) to work with timezone abbreviation."
let time_diffs = {};

fetch('/static/timezones.json')
  .then(response => response.json())
  .then(json => {
    time_diffs = json; 
  });

// "Write a function to get the current time called get_time in any timezone with the 
// UTC offset as input in JavaScript. Feel free to look up how JavaScript Date objects work and how to get the time."
function get_time(offset) { //It makes more sense as offset instead of time zone
  let now = new Date();
  let utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

  let localTime = new Date(utcTime + (3600000 * offset));
  return localTime.toLocaleString();
}

const addForm = document.getElementById('add-timezone-form');
const deleteForm = document.getElementById('delete-timezone-form');
const clocksList = document.getElementById('clocks');
const clockTemplate = document.getElementById('clock-template');

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const tzInput = document.getElementById('timezone-input');
  const tzAbbrev = tzInput.value.trim();

  if (!tzAbbrev || !(tzAbbrev in time_diffs)) {
    alert("Invalid or unknown timezone abbreviation!");
    return;
  }

  const clone = clockTemplate.content.cloneNode(true);
  
  clone.querySelector('.timezone').textContent = tzAbbrev;
  clone.querySelector('.offset').textContent = "UTC " + time_diffs[tzAbbrev];
  clone.querySelector('.time').textContent = get_time(time_diffs[tzAbbrev]);

  clocksList.appendChild(clone);

  tzInput.value = "";
});


//"Write a function and add it to listen to the submit event of the second form element"
deleteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const indexInput = document.getElementById('delete-index-input');
  const index = parseInt(indexInput.value);

  if (isNaN(index) || index < 1 || index > clocksList.children.length) {
    alert("Invalid clock index!");
    return;
  }

  clocksList.removeChild(clocksList.children[index - 1]);
  
  indexInput.value = "";
});

// "write a function that updates clocks called update_clocks in clocks ul element"
function update_clocks() {
  const clockItems = clocksList.querySelectorAll('li');
  clockItems.forEach((item) => {
    const tzAbbrev = item.querySelector('.timezone').textContent;
    const offset = time_diffs[tzAbbrev];
    item.querySelector('.time').textContent = get_time(offset);
  });
}

// "Create an interval that calls update_clocks every second"
setInterval(update_clocks, 1000); //1000ms == 1 sec
