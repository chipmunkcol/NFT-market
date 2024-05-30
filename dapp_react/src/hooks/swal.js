import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// export const Fire = (title, text, icon = "warning") => {
//   Swal.fire({
//     title,
//     text,
//     icon,
//   });
// };

export const toastSwal = (title, icon = "success") => {
  Toast.fire({
    title,
    icon,
  });
};

export const Confirm = async (title, text) => {
  const result = Swal.fire({
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Ok",
  });

  return result;
  // }).then((result) => {
  //   /* Read more about isConfirmed, isDenied below */
  //   if (result.isConfirmed) {
  //     Swal.fire("Saved!", "", "success");
  //   } else if (result.isDenied) {
  //     Swal.fire("Changes are not saved", "", "info");
  //   }
};
