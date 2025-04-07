import TodoFilter from "@/components/todoFilter";
import TodoForm from "@/components/todoForm";
import TodoList from "@/components/todoList";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="min-h-screen bg-black py-10 px-4 sm:px-6 lg:px-8">
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            icon: "✅",
          },
          error: {
            icon: "❌",
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Offline Todo App</h1>
          <p className="text-sm text-gray-500">
            A simple prototype built with React 19 + Redux-Saga + TypeScript
          </p>
        </header>

        <TodoForm />
        <TodoFilter />
        <TodoList />
      </div>
    </main>
  );
};

export default App;
