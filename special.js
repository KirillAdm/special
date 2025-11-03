document.addEventListener('DOMContentLoaded', function () {
  let button = document.getElementById('but');
  if (button) {
    // Check if button exists before assigning onclick
    button.onclick = function () {
      alert('123');
    };
  }
});
