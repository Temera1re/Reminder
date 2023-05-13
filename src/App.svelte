<script lang="ts">
  import { onMount } from 'svelte'
  import { Page } from './types/misc'
  import Reminder from './reminder/Reminder.svelte'
  import Coordinates from './coords/Coordinates.svelte'
  import Random from './random/Random.svelte'
  import Stuff from './stuff/Stuff.svelte'

  let currentPage: Page = Page.Reminder
  let currentPageId: number = 0
  $: pageTranslate = `--scrolloffset: calc(-${currentPageId * 100}vw - ${currentPageId * 2}px)`

  onMount(async () => {})

  function setPage(page: Page) {
    currentPage = page
    if (currentPage == Page.Reminder) currentPageId = 0
    if (currentPage == Page.Coordinates) currentPageId = 1
    if (currentPage == Page.Random) currentPageId = 2
    if (currentPage == Page.Stuff) currentPageId = 3
  }
</script>

<header>
  <span class="title">{currentPage}</span>
</header>
<main>
  <div class="scrollContainer" style={pageTranslate}>
    <div><Reminder /></div>
    <div><Coordinates /></div>
    <div><Random /></div>
    <div><Stuff /></div>
  </div>
</main>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<footer>
  <div class={currentPage == Page.Reminder ? 'active' : ''} on:click={setPage.bind(this, Page.Reminder)}>
    <span class="material-icons md-30">edit_notifications</span>
    <span class="text">{Page.Reminder}</span>
  </div>
  <div class={currentPage == Page.Coordinates ? 'active' : ''} on:click={setPage.bind(this, Page.Coordinates)}>
    <span class="material-icons md-30">explore</span>
    <span class="text">{Page.Coordinates}</span>
  </div>
  <div class={currentPage == Page.Random ? 'active' : ''} on:click={setPage.bind(this, Page.Random)}>
    <span class="material-icons md-30">casino</span>
    <span class="text">{Page.Random}</span>
  </div>
  <div class={currentPage == Page.Stuff ? 'active' : ''} on:click={setPage.bind(this, Page.Stuff)}>
    <span class="material-icons md-30">inventory_2</span>
    <span class="text">{Page.Stuff}</span>
  </div>
</footer>

<style>
  header {
    grid-row: 1;
    height: 50px;
    background: var(--bg-1);
    color: var(--txt-0);
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }
  header > .title {
    font-size: 24px;
  }
  main {
    grid-row: 2;
    width: 100vw;
    overflow: hidden;
    background: var(--bg-0);
    display: flex;
  }
  main > .scrollContainer {
    display: flex;
    flex-direction: row;
    transition: transform 100ms ease-in-out;
    transform: translateX(var(--scrolloffset));
  }
  main > .scrollContainer > div {
    min-width: calc(100vw + 2px);
    color: var(--txt-1);
    border-right: 2px solid var(--bg-2);
    padding: 8px;
    padding-bottom: 68px;
    overflow: auto;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: hsla(0 0% 9% / 0.95);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 2px solid var(--bg-2);
  }
  footer > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--txt-1);
    font-size: 14px;
    width: 70px;
  }
  footer > div.active {
    color: #29b8b6;
  }
</style>
