<script lang="ts">
  import { onMount } from 'svelte'
  import { Haptics, ImpactStyle } from '@capacitor/haptics'

  let toDos: string[] = ['test1', 'test2', 'test3']
  let name: string = ''

  function handleClick() {
    const input = document.querySelector('input') as HTMLInputElement
    const toDo = input.value
    toDos.push(toDo)
    console.log('clicked button')
    input.value = ''
  }

  const addItem = () => {
    toDos = [...toDos, name]
    name = ''
  }

  const remove = (item) => {
    toDos = toDos.filter((i) => i !== item)
  }

  // onMount(() => {
  //   console.log(toDos)
  // })
</script>

<form on:submit|preventDefault={addItem}>
  <label for="name">Add an item</label>
  <input id="name" type="text" bind:value={name} />
</form>

<ul>
  {#each toDos as toDo}
    <li>
      {toDo}
      <button on:click={() => remove(toDo)}>x</button>
    </li>
  {/each}
</ul>

<style>
  div,
  h1 {
    color: #333;
    max-width: 300px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
      sans-serif;
  }
  #name {
    width: 100%;
  }
  form {
    margin-bottom: 0.5em;
  }
  input[type='text'] {
    outline: none;
    margin: 0;
  }
  input[type='text']:focus {
    border-color: #21aadc;
    box-shadow: 0 0 2px #0a6a8d;
  }
  input[type='checkbox'] {
    margin: 0 10px 0 0;
  }
  li button {
    float: right;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    color: #dc4f21;
    font-size: 18px;
    cursor: pointer;
  }
  li button:hover {
    transform: scale(2);
  }
  li button:focus {
    outline: #dc4f21;
  }
  li:last-child {
    border-bottom: none;
  }
  label {
    display: block;
    text-transform: uppercase;
    font-size: 0.8em;
    color: #777;
  }
  li {
    list-style: none;
    padding: 6px 10px;
    border-bottom: 1px solid #ddd;
  }
  ul {
    padding-left: 0;
  }
  .done span {
    opacity: 0.4;
  }
</style>
