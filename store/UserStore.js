import axios from 'axios';
import { create } from 'zustand';
import Swal from 'sweetalert2';

const UserStore = create((set, get) => ({
  loginUser: null,
  setLoginUser: (user) => set({ loginUser: user }),
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

  handleDelete: async (id, navigate) => {
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
        input: 'password',
        text: '확인을 위해 비밀번호를 입력해주세요.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 삭제합니다.',
        showLoaderOnConfirm: true,
        cancelButtonText: '아니요',
        reverseButtons: true,
        preConfirm: async (password) => {
          console.log('password', password);
          console.log('id', id);
          try {
            const resUser = await axios.get(`http://localhost:3001/users?id=${id}`);
            const user = resUser.data[0];
            console.log('user.password', user.password);
            if (String(user.password) === String(password)) {
              const response = await axios.delete(`http://localhost:3001/users/${id}`);
              return response.data;
            } else {
              Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
            }
          } catch (error) {
            Swal.showValidationMessage(`
        요청 실패: ${error}
      `);
          }
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          set({ deleteUserId: id });
          await get().deleteUser(id);
          set({ deleteUserId: null });
          swalWithBootstrapButtons
            .fire({
              title: '삭제했습니다.',
              icon: 'success',
            })
            .then(() => {
              navigate('/login', {
                state: {
                  toastMessage: '로그인 된 계정이 삭제되면서 로그아웃이 되었습니다.',
                },
              });
              set({ loginUser: null });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: '취소했습니다.',
            icon: 'error',
          });
        }
      });
  },
  handleLogout: () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '정말 로그아웃하시겠습니까?',
        text: '로그아웃하고 오프라인으로 전환합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 로그아웃할래요!',
        cancelButtonText: '아니요, 괜찮습니다.',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          set({ loginUser: null });
          swalWithBootstrapButtons.fire({
            title: '로그아웃했습니다.',
            icon: 'success',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: '로그아웃하지 않았습니다.',
            text: '기존 서비스를 그대로 이용할 수 있습니다.',
            icon: 'error',
          });
        }
      });
  },
}));

export default UserStore;
