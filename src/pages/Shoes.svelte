<script lang="ts">
  import { onMount } from 'svelte'
  import type { Shoe } from '../types/misc'

  let shoes: Shoe[] = []

  onMount(async () => {})
</script>

<ol>
  {#each shoes as shoe (shoe.id)}
    <li>
      <span class="title">{shoe.name}</span>
      <span class="wear">{shoe.wears.reduce}</span>
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
  li:active {
    opacity: 1;
  }
  .title {
    grid-row: 1;
    grid-column: 1/3;
  }
</style>
