<script>
import TodoItem from "./TodoItem.vue";
import TodoInput from "./TodoInput.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useTodoList } from "../composables/useTodoList";
import { useQuasar } from "quasar";

export default {
  components: { TodoInput, TodoItem },
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const { setFilter, todos, filter } = useTodoList();

    const taskLeft = computed(function () {
      return store.getters["todos/active"].length;
    });

    function clearCompleted() {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to clear completed tasks",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        store.commit("todos/clearCompleted");
      });
    }

    return {
      todos,
      filter,
      taskLeft,
      filterTypes: ["All", "Active", "Completed", "Favorites"],
      setFilter,
      clearCompleted,
    };
  },
};

</script>

<template>
  <div class="todo-list">
    <TodoInput />
    <div class="list-container">
      <TodoItem v-for="todo in todos" :key="todo.id" :task="todo" />
    </div>
    <div class="footer">
      <span>{{ taskLeft }} remain</span>
      <div class="filter-buttons">
        <button
          v-for="filterType in filterTypes"
          :key="filterType"
          :class="{ active: filter === filterType }"
          @click="setFilter(filterType)"
        >
          {{ filterType }}
        </button>
      </div>

      <button @click="clearCompleted">Clear Completed</button>
    </div>

    <div>

    </div>
  </div>
</template>

<style lang="scss">
.todo-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  .list-container {
    flex-grow: 1;
    overflow: auto;
    background: var(--todo-bg-color);
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.3rem;
  }
  .footer {
    background: var(--todo-bg-color);
    display: flex;
    padding: 1rem;
    align-items: center;
    color: var(--text-secondary);
    button {
      background: none;
      border: none;
      color: inherit;
      margin-right: 1rem;
      cursor: pointer;
    }
    .filter-buttons {
      margin-left: 2rem;
      flex-grow: 1;
      button.active {
        color: var(--text-secondary);
      }
    }
  }
}
</style>
