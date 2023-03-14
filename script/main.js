const addListner = (selector, eventName, callback) => {
  document.querySelector(selector).addEventListener(eventName, callback);
};
const fetchData = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};
