import axios from 'axios';
import { create } from 'zustand';

const UserStore = create((set) => ({
  loginUser: null,
  loading: false,
  error: null,
  deleteUserId: null,

  deleteUser: async (id) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:3001/users/${id}`);

      set(() => ({
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
  checkPassword: async (id) =>
    Swal.fire({
      title: '확인을 위해 비밀번호를 입력해주세요',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: '탈퇴하기',
      showLoaderOnConfirm: true,
      preConfirm: async (password) => {
        try {
          const response = await axios.get(`http://localhost:3001/users?id=${id}`);
          const user = response[0];
          if (user) {
            return Swal.showValidationMessage(`${user}`);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
        Request failed: ${error}
      `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    }),
  handleDelete: async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '정말 삭제하겠습니까?',
        text: '해당 아이디를 삭제합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 삭제합니다.',
        cancelButtonText: '아니요',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          set({ deleteUserId: id });
          await get().deleteUser(id);
          set({ deleteUserId: null });
          swalWithBootstrapButtons.fire({
            title: '삭제했습니다.',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: '취소했습니다.',
            icon: 'error',
          });
        }
      });
  },
}));

export default UserStore;
