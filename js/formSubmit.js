$(document).ready(function() {
    $("#tel").mask("+7 (999) 999-99-99");

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccessNotification() {
        const $notification = $('.notification');
        
        $notification.addClass('notification--visible');
        
        setTimeout(() => {
            $notification.removeClass('notification--visible');
        }, 5000);
    }

    $('#submit').click(function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const tel = $('#tel').val().trim();
        const comment = $('#comment').val().trim();
        
        let isFormValid = true;
        
        $('.error-message').text('').hide();
        $('.offer__input-wrapper').removeClass('input-error');

        if (name === '') {
            $('#name-error').text('Пожалуйста, введите ваше имя').show();
            $('#name').closest('.offer__input-wrapper').addClass('input-error');
            isFormValid = false;
        }
        
        if (tel === '' || tel.indexOf('_') !== -1) {
            $('#tel-error').text('Пожалуйста, проверьте номер телефона').show();
            $('#tel').closest('.offer__input-wrapper').addClass('input-error');
            isFormValid = false;
        }
        
        if (email === '') {
            $('#email-error').text('Пожалуйста, введите ваш email').show();
            $('#email').closest('.offer__input-wrapper').addClass('input-error');
            isFormValid = false;
        } else if (!isValidEmail(email)) {
            $('#email-error').text('Пожалуйста, проверьте правильность введенного email').show();
            $('#email').closest('.offer__input-wrapper').addClass('input-error');
            isFormValid = false;
        }
        
        if (isFormValid) {
            $.ajax({
                url: './php/formSubmit.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    name: name,
                    email: email,
                    tel: tel,
                    comment: comment
                },
                success: function(response) {
                    console.log('Форма успешно отправлена', response);
                    
                    $('form.offer__form')[0].reset();
                    
                    showSuccessNotification();
                },
                error: function(error) {
                    console.error('Ошибка при отправке формы:', error);
                    // alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
                }
            });
        }
    });
    
    $('#name, #tel, #email, #comment').on('input', function() {
        $(this).closest('.offer__input-wrapper').removeClass('input-error');
        const errorId = $(this).attr('id') + '-error';
        $('#' + errorId).hide();
    });
});