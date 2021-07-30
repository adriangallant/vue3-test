import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login';
import Todo from '@/views/Todo';
import Register from '@/views/Register';
import AddTodoForm from '@/views/AddTodoForm';
import EditTodoForm from '@/views/EditTodoForm';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  if (config.url.includes('login') || config.url.includes('register')) {
    return config;
  }
  return {
    ...config, headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
}, (error) => {
  return Promise.reject(error);
});


const beforeEnter = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    next()
    return true;
  }
  next({ path: '/' });
  return false
}

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/todos', component: Todo, beforeEnter },
  { path: '/add-todo', component: AddTodoForm, beforeEnter },
  { path: '/edit-todo/:id', component: EditTodoForm, beforeEnter },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App);
app.use(router);
app.mount('#app')
