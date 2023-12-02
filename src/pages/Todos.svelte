<script lang="ts">
  import { onMount } from 'svelte'
  import type { Todo } from '../types/misc'
  import { now } from 'svelte/internal'
  import { timeToString } from '../util/time'
  import { flip } from 'svelte/animate'

  let todos: Todo[] = [
    {
      id: '0',
      starttime: now() - 1000 * 60 * 60,
      endtime: now() + 1000 * 60 * 60,
      title: 'Todo Seite entwickeln',
    },
    {
      id: '1',
      starttime: now() - 1000 * 60 * 60,
      endtime: now() + 1000 * 60 * 60,
      title: 'Liste generell enwickeln',
    },
    {
      id: '2',
      starttime: now() - 1000 * 60 * 60,
      endtime: now() + 1000 * 60 * 60,
      title: 'DnD',
    },
    {
      id: '3',
      starttime: now() - 1000 * 60 * 60,
      endtime: now() + 1000 * 60 * 60,
      title: 'Hinzufügen',
    },
    {
      id: '4',
      starttime: now() - 1000 * 60 * 60,
      endtime: now() + 1000 * 60 * 60,
      title: 'Löschen',
    },
  ]

  let hovering = -1

  onMount(async () => {})

  const drop = (event, target) => {
    console.log('dropped')
    event.dataTransfer.dropEffect = 'move'
    const start = parseInt(event.dataTransfer.getData('text/plain'))
    const newTracklist = todos

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start])
      newTracklist.splice(start, 1)
    } else {
      newTracklist.splice(target, 0, newTracklist[start])
      newTracklist.splice(start + 1, 1)
    }
    todos = newTracklist
    hovering = -1
  }

  const dragstart = (event: DragEvent, i) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'

    const start = i
    event.dataTransfer.setData('text/plain', start)
  }

  const dragover = () => {
    return false
  }
</script>

<ol>
  {#each todos as todo, index (todo.id)}
    <li
      animate:flip={{ duration: 200 }}
      draggable={true}
      on:dragstart={(event) => dragstart(event, index)}
      on:drop|preventDefault={(event) => drop(event, index)}
      on:dragover|preventDefault={() => dragover()}
      on:dragenter={() => (hovering = index)}
      class:is-active={hovering === index}
    >
      <div class="dragHandle" />
      <span class="title">{todo.title}</span>
      <span class="starttime">Start: {timeToString(todo.starttime)}</span>
      <span class="endtime">Ende: {timeToString(todo.endtime)}</span>
    </li>
  {/each}
</ol>

<style>
  ol {
    height: 100%;
    overflow: auto;
    list-style-type: none;
    padding: 0px;
  }
  li {
    border-bottom: 1px solid var(--bg-2);
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr auto;
    color: var(--txt-0);
  }
  li > span {
    padding: 8px 16px;
  }
  li.is-active {
    background-color: #29b8b6;
    color: var(--bg-0);
  }
  li:active {
    opacity: 1;
  }
  .dragHandle {
    grid-row: 1/3;
    grid-column: 3;
    width: 50px;
    background: hsl(0, 0%, 10%);
    cursor: move;
  }
  .title {
    grid-row: 1;
    grid-column: 1/3;
  }
  .starttime {
    grid-row: 2;
    grid-column: 1;
  }
  .endtime {
    grid-row: 2;
    grid-column: 2;
  }
</style>
