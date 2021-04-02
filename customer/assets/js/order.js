// Main.js
(function () {


    /* initialise */ 
    function init(){
        let tippyConfigs = {
          maxWidth: 410,
          placement: 'bottom',
          theme: 'light',
          allowHTML: true,
          animation: 'fade',
          trigger: 'click',
          interactive: true,
        }

        const acceptOrderTpl = document.getElementById('accept-order-tpl');
        const rejectOrderItemTpl = document.getElementById('reject-order-item-tpl');

        const acceptOrderTippyConfig = Object.assign({content: acceptOrderTpl.innerHTML }, tippyConfigs);
        const rejectOrderItemTippyConfig = Object.assign({content: rejectOrderItemTpl.innerHTML }, tippyConfigs);
        
        tippy('#accept-order-btn', acceptOrderTippyConfig);

        tippy('.reject-order-item-btn', rejectOrderItemTippyConfig);






        
    }

    init();
        
})();


