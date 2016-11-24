$(document).ready(function(){
  // Menu Toggle Script
  $("#sidebar-toggle").click(function(e) {
    e.preventDefault();
    $(".wrapper").toggleClass("toggled");
  });

  // Add active class to Sidebar-menu
  $('ul.sidebar-menu li').click(function(){
    $('li').removeClass("active-link");
    $(this).addClass("active-link");
  });

  // Add a date to admin-menu 
  var d = new Date();
  document.getElementById("admin-date").innerHTML = d.toDateString();

});

$(function(){
  /* Sets the minimum height of the wrapper div to ensure the footer reaches the bottom */
  function setWrapperMinHeight() {
    $('.wrapper').css('minHeight', window.innerHeight - $('.main-header').height() - $('.main-footer').height());
  } 
  /* Make sure the main div gets resized on ready */
  setWrapperMinHeight();
  /* Make sure the wrapper div gets resized whenever the screen gets resized */
  window.onresize = function() {
    setWrapperMinHeight();
  }
});


 