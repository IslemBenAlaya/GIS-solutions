// JavaScript function to show/hide subpages based on the selected tab
function showSubpage(subpageId) {
  // Remove the 'active' class from all tabs
  var tabs = document.querySelectorAll('.navbar li a');
  tabs.forEach(function(tab) {
    tab.classList.remove('active');
  });

  // Add the 'active' class to the clicked tab
  var clickedTab = document.querySelector(`[onclick="showSubpage('${subpageId}')"]`);
  clickedTab.classList.add('active');

  // Hide all subpages
  var subpages = document.getElementsByClassName("subpage");
  for (var i = 0; i < subpages.length; i++) {
    subpages[i].style.display = "none";
  }

  // Show the selected subpage
  var selectedSubpage = document.getElementById(subpageId);
  selectedSubpage.style.display = "block";

  // Fetch the content for the selected subpage
  var subpageFilename = "subpages/" + subpageId + ".html";

  fetch(subpageFilename)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(function(html) {
      // Set the fetched content as innerHTML of the selected subpage
      selectedSubpage.innerHTML = html;
    })
    .catch(function(error) {
      console.log("Error fetching subpage content:", error);
    });
}
    // Automatically load subpage0 on page load
    document.addEventListener("DOMContentLoaded", function() {
      showSubpage('subpage0');
       });
// Bind click events to tabs and subpage toggling
document.addEventListener("DOMContentLoaded", function() {
  var tabs = document.querySelectorAll('.navbar li a');
  tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      var subpageId = tab.getAttribute("href").substring(1);
      showSubpage(subpageId);
    });
  });
});
