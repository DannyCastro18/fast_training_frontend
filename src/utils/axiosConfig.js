import axios from 'axios';

// Configurar interceptor para renovar token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado renovar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Llamada para renovar el token
        const response = await axios.post('/api/auth/refresh-token');
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Reintentar la petición original con el nuevo token
        return axios(originalRequest);
      } catch (error) {
        // Si falla la renovación, redirigir al login
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
); 