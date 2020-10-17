a = '<a href="https://www.anandmaratha.com/maratha-bride/122104"  target="_blank" ><img src=" https://www.anandmaratha.com/girls/mg111392.jpg "  >  187-> 1993 </a>'
b = '<a href="https://www.anandmaratha.com/maratha-bride/122098"  target="_blank" ><img src=" https://www.anandmaratha.com/girls/mg111390.jpg "  >  188-> 1994  </a>'


console.log(arr[arr.length-2]);

function Comparator(a, b) {
    a = a.split(' ');
    a = Number(a[a.length-2]);

    b = b.split(' ');
    b = Number(b[b.length-2]);
    return a-b ;
}
