// Main.js
(function () {

    
    /* bind events */ 
    function bindEvents(){
        $(".clickable-row").click(function() {
            window.location = $(this).data("href");
        });

    }

    /* initialise */ 
    function init(){
        $('[data-toggle="popover"]').popover();
        bindEvents();
    }

    init();
        
})();


