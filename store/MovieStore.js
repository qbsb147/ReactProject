import axios from 'axios';
import { create } from 'zustand';
import Swal from 'sweetalert2';

const useMovieStore = create((set, get) => ({
  movies: [],
  page: 0,
  hasMore: true,
  loading: false,
  error: null,
  deleteMovieId: null,

  getMovies: async (page = 0) => {
    set((state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    try {
      const response = await axios.get(`http://localhost:8888/api/movies`);
      const newMovies = response.data.content;
      const isLastPage = response.data.last;
      console.log(response);
      set((state) => ({
        movies: [...state.movies, ...newMovies], // 기존 영화 + 새 영화
        page: page,
        hasMore: !isLastPage,
        loading: false,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.message,
      }));
    }
  },
  deleteMovie: async (movie_no) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`http://localhost:8888/api/movies/${movie_no}`);

      set((state) => ({
        movies: state.movies.filter((Movies) => Movies.movie_no !== movie_no),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

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
        text: '해당 자료를 삭제합니다.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '네, 삭제합니다.',
        cancelButtonText: '아니요',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          set({ deleteMovieId: id });
          await get().deleteMovie(id);
          set({ deleteMovieId: null });
          swalWithBootstrapButtons.fire({
            title: '삭제했습니다..',
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

export default useMovieStore;
