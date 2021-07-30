<template>
  <div>
    <TodoForm edit :id='$route.params.id'></TodoForm>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm";

export default {
  components: {
    TodoForm,
  },
};
</script>