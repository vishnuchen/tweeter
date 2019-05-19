
$(document).ready(function() {
    // --- our code goes here ---
    $('textarea').on('input',function(event) {
        const charCount = 140 - this.value.length;
        $('.counter').text(charCount);

        if (charCount < 0) {
            $('.counter').addClass('red');
        } else {
            $('.counter').removeClass('red');
        }
    })


})
