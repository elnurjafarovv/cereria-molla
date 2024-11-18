/*
* Broadcast Theme
*
* Use this file to add custom Javascript to Broadcast.  Keeping your custom
* Javascript in this fill will make it easier to update Broadcast. In order
* to use this file you will need to open layout/theme.liquid and uncomment
* the custom.js script import line near the bottom of the file.
*/


(function() {
  // Add custom code below this line
  // Carrusel de imagenes alternativas de productop
  if(document.querySelectorAll('.product__thumbs__holder').length){
    let content = document.querySelector('product-thumbs.product__thumbs');
    let slides = Array.from(document.querySelectorAll('.product__thumbs__holder .product__thumb'));
    let active = 0;
    let numMarginLeft = 33.33;
    let slider = document.querySelector('.product__thumbs__holder');
  
    function nextSlide() {
      if(document.querySelector('.arrow.right[disabled]')==null){
        active=active+1;
        slider.style.setProperty('margin-left','-'+(numMarginLeft * active)+'%');
        
        document.querySelector('.arrow.left').removeAttribute("disabled");
        
        if((slides.length - active)==3){
          document.querySelector('.arrow.right').setAttribute("disabled", "disabled");
        }
      }
    }
    
    function prevSlide() {
      if(document.querySelector('.arrow.left[disabled]')==null){
        active=active-1;
        if(active>1){
          slider.style.setProperty('margin-left','-'+(numMarginLeft * active)+'%');
        }else{
            slider.style.setProperty('margin-left','0');   
        }

        document.querySelector('.arrow.right').removeAttribute("disabled");
        
        if(active<=0){
          document.querySelector('.arrow.left').setAttribute("disabled", "disabled");
        }
      }
    }
    
    if(slides.length>3){
      let leftArrow = document.createElement('div');
      leftArrow.className = 'arrow left';
      leftArrow.innerHTML = '&#10094;';
      leftArrow.onclick = prevSlide;
      content.appendChild(leftArrow);
      leftArrow.setAttribute("disabled", "disabled");
      
      let rightArrow = document.createElement('div');
      rightArrow.className = 'arrow right';
      rightArrow.innerHTML = '&#10095;';
      rightArrow.onclick = nextSlide;
      content.appendChild(rightArrow);
    }
  }
  if(document.querySelector('.drawer__foot .btn.cart__checkout')!=null){
    document.querySelector(".drawer__foot .btn.cart__checkout").addEventListener("click", function(event){
      event.preventDefault();
      window.location.href = window.location.origin+'/cart';
    });
  }

  if(document.querySelector('.cart__button-continue a.btn')!=null){
     document.querySelector(".cart__button-continue a.btn").setAttribute("href", window.location.origin+'/');
    /*
    document.querySelector(".cart__button-continue a.btn").addEventListener("click", function(event){
      event.preventDefault();
      window.location.href = window.location.origin+'/';
    });*/
  }

  

  /////////////////////////////////////////////////////////////////////////
  function findInCart(producto){ /* devuelve el elemento si esta */
    var productsInCart = document.querySelectorAll('cart-items .cart__item__title a');
    var itIsProductInCart=null;
    // Para cada producto en la cesta
    productsInCart.forEach(function(productInCart) {
        // Obtener el enlace del producto
        var productoCart = productInCart.getAttribute('href').split('?')[0];
        if(producto==productoCart){
          itIsProductInCart = obtenerPadrePorSelector(productInCart, '.cart__item__content');
        }
    });
    return itIsProductInCart;
  }
  function customAddToCart(producto, sectionSelector, maxNum) {
    setTimeout(() => {
      if(document.querySelector('.noClick')!=null){
        document.querySelector('.noClick').classList.remove('noClick');
      } 
    }, 500);
      // Comprobar si el producto ya está en la cesta
      if (document.querySelectorAll(`${sectionSelector} .grid-item.product-item.product-item--has-quickbuy.hiddenProductInCart`).length >= maxNum) {
          return false;
      }
  
      // Añadir el producto a la cesta
      const elementItem = document.querySelectorAll(`${sectionSelector} .product-link[href="${producto}"]`)[0];
      const elementItemParent = obtenerPadrePorSelector(elementItem, '.grid-item.product-item.product-item--has-quickbuy');
      elementItemParent.classList.add('hiddenProductInCart');
      return true;
  }
  function customRemoveInCart(producto) {
    var itemInCart=findInCart(producto);
    if(itemInCart){
      var buttonRemoveInBasket=itemInCart.querySelectorAll('a.cart__item__remove')[0];
      buttonRemoveInBasket.click();
    }
    setTimeout(() => {
      if(document.querySelector('.noClick')!=null){
        document.querySelector('.noClick').classList.remove('noClick');
      } 
    }, 500);
  }
  // --------- section[isection.special_section_collection] -------------------  
  function obtenerPadrePorSelector(elemento, selector) {
    // Comenzar con el elemento padre
    var padre = elemento.parentNode;

    // Mientras tengamos un elemento padre
    while (padre && padre.nodeType === Node.ELEMENT_NODE ) {
        // Si el padre coincide con el selector, devolverlo
        if (padre.matches(selector)) {
            return padre;
        }
        // Si no, seguir subiendo en el árbol DOM
        padre = padre.parentNode;
    }

    // Si no encontramos ningún elemento que coincida, devolver null
    return null;
  }
  function revisarProductosEnCesta(section) {
    // Obtener todos los productos en la cesta
    var productsInCart = document.querySelectorAll('cart-items .cart__item__title a');

    // Para cada producto en la cesta
    productsInCart.forEach(function(productInCart) {
        // Obtener el enlace del producto
        var producto = productInCart.getAttribute('href').split('?')[0];
        // Buscar el producto en la sección especial
        var elementItem = document.querySelector(section+' .product-link[href="'+producto+'"]');
        // Si el producto se encuentra en la sección especial
        if (elementItem) {
            // Obtener el elemento padre
            var elementItemParent = obtenerPadrePorSelector(elementItem, '.grid-item.product-item.product-item--has-quickbuy');
            // Añadir la clase hiddenProductInCart
            elementItemParent.classList.add('hiddenProductInCart');
            var cart__item__content =  obtenerPadrePorSelector(productInCart,'.cart__item');
            if(cart__item__content){
              cart__item__content.querySelectorAll('.cart__quantity-counter')[0].style.visibility = "hidden"; 
            }
        }
    });
  }
  if(document.querySelector('.hideProduct') && document.querySelector('cart-drawer .cart__item__content')){
    document.querySelectorAll('.hideProduct').forEach(function(hideProduct){
    // Para cada producto en la cesta
      var txtSelectorElement='cart-drawer cart-items .cart__item__title a[href*="'+hideProduct.getAttribute('data-productlink')+'"]';

      var productsInCart = document.querySelector(txtSelectorElement);
      if(productsInCart){
        var cart__item__content = obtenerPadrePorSelector(productsInCart, '.cart__item');
        if(cart__item__content){
              cart__item__content.querySelector('.cart__quantity-counter').style.visibility = "hidden"; 
        }
        
      }
      
    });
  }
  // Añadir un event listener a los botones de "Añadir a la cesta"
  var maxNum = 0;
  if(document.querySelectorAll('section.special_section_collection').length){
    maxNum = parseInt(document.querySelectorAll('section.special_section_collection')[0].getAttribute('data-numtoadd'));
  }
  // -- botonesSpecialSectionCollection
  //-----------------------------
  var botonesSpecialSectionCollection = document.querySelectorAll('section.special_section_collection [action="/cart/add"] button.quick-add__button');
  botonesSpecialSectionCollection.forEach(function(boton) {
      // Clonar el botón
      var clonBoton = boton.cloneNode(true);
      
      // Ocultar el botón original
      boton.style.visibility = "hidden"; 
      
      // Reemplazar el botón original con el clon
      boton.parentNode.insertBefore(clonBoton, boton);
      
      clonBoton.addEventListener('click', function(event) {
          event.preventDefault();
          
          var producto = this;
          var padre = obtenerPadrePorSelector(producto, '.product-item--has-quickbuy');
          
          if(customAddToCart(padre.querySelectorAll('.product-link')[0].getAttribute('href'), 'section.special_section_collection', maxNum)){
              // Si añadirALaCestaSpecialSection devuelve true, hacer clic en el botón original
              boton.click();
          }
      });
  });
  revisarProductosEnCesta('section.special_section_collection');
  // -- botonesCustomGridProducts  
  //-----------------------------
  var botonesCustomGridProducts = document.querySelectorAll('section.customGridProducts [action="/cart/add"] button.quick-add__button');
  botonesCustomGridProducts.forEach(function(boton) {
      // Clonar el botón
      var clonBoton = boton.cloneNode(true);
      // Ocultar el botón original
      boton.style.visibility = 'hidden';
      // Reemplazar el botón original con el clon
      boton.parentNode.insertBefore(clonBoton, boton);
      clonBoton.addEventListener('click', function(event) {
          event.preventDefault();
          var producto = this;
          var padre = obtenerPadrePorSelector(producto, '.product-item--has-quickbuy'); 
        
          if(customAddToCart(padre.querySelectorAll('.product-link')[0].getAttribute('href'), 'section.customGridProducts', 1)){
              // Si añadirALaCestaCustomGridProducts devuelve true, hacer clic en el botón original
              boton.click();            
          }
      });
  });
  revisarProductosEnCesta('section.customGridProducts');

  if(document.querySelectorAll('body.template-cart .cart.is-empty') && document.querySelectorAll('.cart-items .cart__item__title a')==null){
      document.querySelectorAll('body.template-cart .main-content .shopify-section+.shopify-section').forEach(function(shopifyCartSection) {
        shopifyCartSection.style.visivility = "hidden"; 
      });
  }
  
  document.addEventListener('theme:cart:change',function(event){
    if(document.querySelectorAll('.cart-items .cart__item__title a')==null){
      document.querySelectorAll('body.template-cart .main-content .shopify-section+.shopify-section').forEach(function(shopifyCartSection) {
        shopifyCartSection.style.visibility = "hidden"; 
      });
    }else if(document.querySelectorAll('body.template-cart .main-content .shopify-section+.shopify-section[style]')){
        document.querySelectorAll('body.template-cart .main-content .shopify-section+.shopify-section[style]').forEach(function(shopifyCartSection) {
          shopifyCartSection.removeAttribute('style'); 
        });
      }
      revisarProductosEnCesta('section.special_section_collection');
      revisarProductosEnCesta('section.customGridProducts');  
      
      if(document.querySelector('.hideProduct') && document.querySelector('cart-drawer .cart__item__content')){
          document.querySelectorAll('.hideProduct').forEach(function(hideProduct){
          // Para cada producto en la cesta
            var txtSelectorElement='cart-drawer cart-items .cart__item__title a[href*="'+hideProduct.getAttribute('data-productlink')+'"]';
      
            var productsInCart = document.querySelector(txtSelectorElement);
            if(productsInCart){
              var cart__item__content = obtenerPadrePorSelector(productsInCart, '.cart__item');
              if(cart__item__content){
                    cart__item__content.querySelector('.cart__quantity-counter').style.visibility = "hidden"; 
              }
              
            }
            
          });
      }
    limpiarCestaProductosEspeciales();
    
  });

// gestion producto caja para regalo
  if(document.querySelector('.customGridProducts') || document.querySelector('.special_section_collection')){
    document.querySelectorAll('.customGridProducts .grid-item.product-item, .special_section_collection .grid-item.product-item').forEach(function(productItem, i) { 
      var productUrl=productItem.querySelector('.product-link').getAttribute('href');
      // añade checkbox
      let contentCheckbox = document.createElement('div');
      contentCheckbox.className = 'content-check-buy';
      productItem.appendChild(contentCheckbox);
      
      let checkboxBuy = document.createElement('input');
      checkboxBuy.type = 'checkbox';
      checkboxBuy.className = 'checkboxBuy';
      checkboxBuy.id='checkboxBuy'+i;
      
      if(productItem.classList.contains('hiddenProductInCart')){
        checkboxBuy.checked = true;
        var priceBuy=productItem.querySelector('.product-item__price[data-product-price]').getAttribute('data-product-price');
        if(priceBuy!='' & priceBuy!='0'){
          createAndShowForm();
        }else{
          removeSpecialForm();
        }
      }
      checkboxBuy.addEventListener('change', function() {
        let elementParentGridProducts=obtenerPadrePorSelector(this, '.customGridProducts');
        let gridItemProduct= obtenerPadrePorSelector(this, '.grid-item.product-item');
        elementParentGridProducts!=null ? elementParentGridProducts.classList.add('noClick') : document.querySelector('.special_section_collection').classList.add('noClick');

        if(this.checked) {
           gridItemProduct.querySelector('quick-add-product .quick-add__button.caps').click(); 
          if(!gridItemProduct.classList.contains('hiddenProductInCart')){
            this.checked = false;  
          }

          if(this.checked){
            var priceBuy=gridItemProduct.querySelector('.product-item__price[data-product-price]').getAttribute('data-product-price');
            if(elementParentGridProducts){
              if(priceBuy!='' & priceBuy!='0'){
                createAndShowForm();
              }else{
                removeSpecialForm();
              }
            }
          }else{
              if(elementParentGridProducts){
                 let otherProductCheck=elementParentGridProducts.querySelectorAll('.hiddenProductInCart input.checkboxBuy');
                  otherProductCheck[0].click();
                  setTimeout(() => {
                    this.click();
                  }, 500);
              }
          }
        } else {
          customRemoveInCart(productUrl);
          gridItemProduct.classList.remove('hiddenProductInCart');
          if(elementParentGridProducts){
              if(priceBuy!='' & priceBuy!='0'){
                removeSpecialForm();
              }
            }
        }
      });
       let lblCheckboxBuy = document.createElement('label');
      lblCheckboxBuy.className = 'lblCheckboxBuy';
      lblCheckboxBuy.for='checkboxBuy'+i;
      contentCheckbox.appendChild(checkboxBuy);
      contentCheckbox.appendChild(lblCheckboxBuy);

      //quita link del producto
      productItem.querySelectorAll('a.product-link').forEach(function(productItemLink) {
        productItemLink.addEventListener("click", function(event){
          event.preventDefault();
          checkboxBuy.click();
        });
      });
      
    });
  }
  function removeSpecialForm(){
    var customGridProductsformSection=document.querySelectorAll('.content-custom-form');
    if(customGridProductsformSection.length){ 
      customGridProductsformSection.innerHTML = "";
      customGridProductsformSection[0].remove();
    }
  }
  function createAndShowForm(){
    var customGridProductsformSection=document.querySelectorAll('.content-custom-form');

    if(customGridProductsformSection.length == 0){ 
      // formulario en cart 
      const lblDestinatario = window.translations.cartDestinatario;
      const lblNombre = window.translations.cartNombre;
      const lblMensaje = window.translations.cartMensaje;
      const titleCartSpecialForm=window.translations.cartTitleSpecialForm;
      if(document.querySelectorAll('.customGridProducts')){
        
        var customGridProductsSection = document.querySelectorAll('section.customGridProducts')[0];
        // Crear los elementos del formulario
    
        let contentCustomForm = document.createElement('div');
        contentCustomForm.className = 'content-custom-form';
        customGridProductsSection.appendChild(contentCustomForm);

        let titleSpecialForm = document.createElement('div');
        titleSpecialForm.className = 'title-custom-form';
        titleSpecialForm.innerHTML=titleCartSpecialForm;
        contentCustomForm.appendChild(titleSpecialForm);
        
        // Crear y añadir etiqueta para 'destinatario'
        var divDestinatario = document.createElement("DIV");
        divDestinatario.className = 'form-content-item';
        var labelDestinatario = document.createElement("LABEL");
        labelDestinatario.setAttribute("for", "destinatario");
        labelDestinatario.innerText = lblDestinatario;
        contentCustomForm.appendChild(divDestinatario);
        divDestinatario.appendChild(labelDestinatario);
        
        var destinatario = document.createElement("INPUT");
        destinatario.setAttribute("type", "text");
        destinatario.setAttribute("id", "destinatario");
        divDestinatario.appendChild(destinatario);
        
        // Crear y añadir etiqueta para 'nombre'
        var divNombre = document.createElement("DIV");
        divNombre.className = 'form-content-item';
        var labelNombre = document.createElement("LABEL");
        labelNombre.setAttribute("for", "nombre");
        labelNombre.innerText = lblNombre;
        contentCustomForm.appendChild(divNombre);
        divNombre.appendChild(labelNombre);
        
        var nombre = document.createElement("INPUT");
        nombre.setAttribute("type", "text");
        nombre.setAttribute("id", "nombre");
        divNombre.appendChild(nombre);
        
        // Crear y añadir etiqueta para 'mensaje'
        var divMensaje  = document.createElement("DIV");
        divMensaje.className = 'form-content-item';
        var labelMensaje = document.createElement("LABEL");
        labelMensaje.setAttribute("for", "mensaje");
        labelMensaje.innerText = lblMensaje;
        contentCustomForm.appendChild(divMensaje);
        divMensaje.appendChild(labelMensaje);
    
        var mensaje = document.createElement("TEXTAREA");
        mensaje.setAttribute("id", "mensaje");
        mensaje.setAttribute("maxlength", "200");
        divMensaje.appendChild(mensaje);
        // Crear el input donde se escribirán los datos
        var note = document.getElementById("note");
        
        // Añadir eventos de escucha para actualizar el input 'note'
        destinatario.addEventListener('input', updateNote);
        nombre.addEventListener('input', updateNote);
        mensaje.addEventListener('input', updateNote);
        
        function updateNote() {
          note.value = ''+lblDestinatario+': ' + destinatario.value + ', '+lblNombre+': ' + nombre.value + ', '+lblMensaje+': ' + mensaje.value;
        }
      }
    }
  }
  /*revisar cesta */

  function limpiarCestaProductosEspeciales() {

    // Encuentra todos los elementos .cart__quantity-counter[style]
    var items = document.querySelectorAll('.cart__quantity-counter[style]');
    var normalItems = document.querySelectorAll('.cart__quantity-counter:not([style])');
    if(normalItems.length){
      return;
    }
    // Si no hay elementos, termina la recursión
    if (items.length === 0) {
      document.querySelectorAll('.template-cart .shopify-section+.shopify-section').forEach(function(shopifysection) {
        shopifysection.style.display='none';
      });
        return;
    }

    // Para cada elemento, haz clic en su hijo a.cart__item__remove
    items.forEach(function(item) {
        var removeButton = item.querySelector('a.cart__item__remove');
        if (removeButton) {
            removeButton.click();
        }
    });

    // Espera un poco para que el DOM se actualice después de hacer clic
    setTimeout(limpiarCestaProductosEspeciales, 500);
}

  // Llama a la función para empezar
  limpiarCestaProductosEspeciales();

  var linksCUstomClick = document.querySelectorAll('.section-columns .grid-item .column__inner .btn');
  linksCUstomClick.forEach(function(boton) {
    var gridItemColumnClick = obtenerPadrePorSelector(boton,'.grid-item');
    gridItemColumnClick.classList.add('gridItemColumnClick');
    gridItemColumnClick.addEventListener('click', function(event) {
      boton.click();
    });
  }); 
  document.querySelectorAll('.template-collection .accordion[open=true] summary.accordion__title').forEach(function(titleAccordion) {
    titleAccordion.click();
  });
  // ^^ Keep your scripts inside this IIFE function call to 
  // avoid leaking your variables into the global scope.

  
})();
