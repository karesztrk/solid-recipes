import { Component, createSignal } from "solid-js";
import { useForm } from "./validation";
import logo from "./logo.svg";
import styles from "./App.module.css";
import ErrorMessage from "./ErrorMessage";

interface Recipe {
  title: string;
  description: string;
}

const App: Component = () => {
  const [recipes, setRecipes] = createSignal<Recipe[]>([]);

  const { validate, formSubmit, errors } = useForm({
    errorClass: "error-input",
  });

  const onSubmit = (form) => {
    const formData = new FormData(form);
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    if (title && description) {
      setRecipes([...recipes(), { title, description }]);
    }
    form.reset();
  };

  const validateTitle = async ({ value }) => {
    return !/[a-zA-Z]*/g.test(value) && `${value} is already being used`;
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <div class={styles.logo}>🥗</div>
        <h2>New recipe</h2>
        <span>Add a new decilicious recipe</span>
        <form use:formSubmit={onSubmit}>
          <div>
            <input
              name="title"
              type="text"
              placeholder="Title"
              required
              use:validate={[validateTitle]}
            />
            {errors.title && <ErrorMessage error={errors.title} />}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description"
              required
              rows="5"
              cols="33"
            />
          </div>

          <button type="submit">Add</button>
        </form>
        <h2>Recipes</h2>
        <ul class={styles.recipes}>
          {recipes().map(({ title, description }) => (
            <li>
              <strong>{title}</strong>
              <p>{description}</p>
              <hr />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
