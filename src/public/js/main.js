

// CONEXIÓN DEL SOCKET DEL CLIENTE

$(function(){
    //mantiene la conexión bidireccional con el servidor
    const socket = io();

    // obteniendo los elementos del DOM

    const $messageForm=  $('#message-form');
    const $messaBox =  $('#message');
    const $chat=  $('#chat');

   // obteniendo los elementos del DOM nicknameForm
    const $nickForm = $('#nickForm');
    const $nickname = $('#nickname');
    const $nickError = $('#nickerror');
    const $users = $('#usernames')

    $nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data =>{ // es un callback
            
            if(data){
                
                
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                
                $nickError.html(`
                        <div class="alert alert-danger">
                            that user already exist
                        </div>
                `);

                setTimeout(function(){
                   $nickError.html('');
                },3000);
            }
            $nickname.val('');
        });
        
    })
   // eventos

   $messageForm.submit(e => {

       e.preventDefault();
       // enviar datos al servidor
       socket.emit('send message',$messaBox.val());
       $messaBox.val('');
   });

   socket.on('new message', data =>{

        $chat.append('<strong>'+data.nick+'</strong> :'+data.msg+'<br>');

   })

   socket.on('usernames',data => {
      
        $users.children().remove(); // para q no m acumule los usuarios, borro la lista y la vuelvo a mostrar

       let html = '<ul>';

       data.forEach(item =>{
          html += `<li class="mt-2"><i class="fas fa-user"></i>${item}</li>`
       } )
       html+='</ul>';

       $users.append(html);


   })
    
   
})