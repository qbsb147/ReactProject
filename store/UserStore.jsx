import axios from 'axios';
import { create } from 'zustand';
import Swal from 'sweetalert2';

const UserStore = create((set, get) => ({
  loginUser: null,
  setLoginUser: (user) => set({ loginUser: user }),
  loading: false,
  error: null,
  deleteUserId: null,
  updateUserId: null,
  uniqueId: false,

  idCheck: async (inputId) => {
    set({ uniqueId: false });
    try {
      const response = await axios.get('http://localhost:8888/api/members');
      const userList = response.data;
      console.log(userList);
      const sameUser = userList.find((user) => String(user.user_id) === String(inputId));
      if (sameUser) {
        set({ uniqueId: false });
        const dupliID = sameUser.user_id;
        Swal.fire({
          icon: 'warning',
          title: '중복된 아이디',
          text: `이 아이디 ${dupliID}는 이미 사용 중입니다.`,
        });
      } else {
        set({ uniqueId: true });
        Swal.fire({
          icon: 'success',
          title: '사용 가능한 아이디',
          text: `${inputId}는 사용할 수 있는 아이디입니다.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '서버에 문제가 발생했습니다.',
        text: `에러 내용 : ${error}`,
      });
    }
  },

  deleteUser: async (user_no) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.delete(`http://localhost:8888/api/members/${user_no}`);
      set(() => ({
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ loading: false, error: error.message });
      Swal.showValidationMessage(`에러가 발생했습니다. ${error}`);
      return error;
    }
  },

  updateUser: async (user_no, userData) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.put(`http://localhost:8888/api/members/${user_no}`, userData);
      set(() => ({
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ loading: false, error: error.message });
      Swal.showValidationMessage(`에러가 발생했습니다. ${error}`);
      return error;
    }
  },

  handleDelete: async (user_no, navigate) => {
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
        preConfirm: async (user_pwd) => {
          try {
            const resUser = await axios.get(`http://localhost:8888/api/members/${user_no}`);
            const user = resUser.data;
            if (String(user.user_pwd) === String(user_pwd)) {
              set({ deleteUserId: user_no });
              const response = await get().deleteUser(user_no);
              set({ deleteUserId: null });
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
  handleUpdate: async (userData, navigate) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '정말 수정하겠습니까?',
        input: 'password',
        text: '확인을 위해 비밀번호를 입력해주세요.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 수정합니다.',
        showLoaderOnConfirm: true,
        cancelButtonText: '아니요',
        reverseButtons: true,
        preConfirm: async (user_pwd) => {
          try {
            const resUser = await axios.get(`http://localhost:8888/api/members/${userData.user_no}`);
            const user = resUser.data;
            if (String(user.user_pwd) === String(user_pwd)) {
              set({ updateUserId: userData.id });
              const response = await get().updateUser(userData.user_no, userData);
              set({ updateUserId: null });
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
          swalWithBootstrapButtons
            .fire({
              title: '수정했습니다.',
              icon: 'success',
            })
            .then(() => {
              navigate('/myInfo', {
                state: {
                  toastMessage: `${userData.user_name}님 회원정보 수정이 완료되었습니다.`,
                },
              });
              set({ loginUser: userData });
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

  handleLogin: async (data, toast, navigate) => {
    let loginUser = null;
    try {
      const user = await axios.get(`http://localhost:8888/api/members?user_id=${data.user_id}`);
      loginUser = user.data;
      if (loginUser.length === 0) {
        toast.error('로그인에 실패했습니다. 아이디를 확인해주세요.');
      }
    } catch (error) {
      toast.error(`로그인 중에 문제가 발생했습니다. ${error}`);
    }
    if (loginUser.user_pwd === data.user_pwd) {
      set({ loginUser: loginUser });
      navigate('/', {
        state: {
          toastMessage: `로그인에 성공하였습니다!`,
        },
      });
    } else {
      toast.error('로그인에 실패했습니다, 비밀번호가 다릅니다.');
    }
  },

  insertUser: async (data, navigate, toast) => {
    try {
      if (get().uniqueId) {
        const userData = {
          user_name: data.user_name,
          user_id: data.user_id,
          user_pwd: data.user_pwd,
          passwordCheck: data.passwordCheck,
          user_nickname: data.user_nickname,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          image: data.image[0] || null,
        };
        await axios.post('http://localhost:8888/api/members', userData);
        navigate('/login', {
          state: {
            toastMessage: `환영합니다! ${data.user_name}님`,
          },
        });
      } else {
        toast.warning('아이디 중복 확인을 해주세요.');
      }
    } catch (error) {
      toast.error('회원가입에 실패했습니다. 재시도해주세요');
    }
  },

  updateSubmit: async (data, toast, navigate) => {
    if (data.user_pwd !== data.passwordCheck) {
      return toast.warning(
        <>
          비밀번호가 일치하지 않습니다. <br />
          비밀번호는 6자 이상이어야 합니다.
        </>
      );
    }
    const userData = {
      user_no: data.user_no,
      user_name: data.user_name,
      user_id: data.user_id,
      user_nickname: data.user_nickname,
      phone: data.phone,
      user_pwd: data.user_pwd,
    };
    get().handleUpdate(userData, navigate);
  },
}));

export default UserStore;
