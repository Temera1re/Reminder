<script lang="ts">
  import { onMount } from 'svelte'
  import { Media, MediaObject } from '@awesome-cordova-plugins/media'
  import { Directory, Filesystem as FS, type FileInfo } from '@capacitor/filesystem'

  let media: MediaObject
  let errorMessage: string

  let files: FileInfo[]
  let currentPath: string = 'file:///storage/emulated/0'

  onMount(async () => {
    try {
      let permissionStatus = await FS.checkPermissions()
      if (permissionStatus.publicStorage !== 'granted') {
        permissionStatus = await FS.requestPermissions()
      }
      if (permissionStatus.publicStorage === 'granted') {
        loadDirectory(currentPath)
      }
    } catch (error) {
      errorMessage = error
    }
  })

  async function loadDirectory(path: string) {
    currentPath = path
    try {
      let dir = await (path ? FS.readdir({ path }) : FS.readdir({ path: '', directory: Directory.Documents }))
      files = dir.files
    } catch (error) {
      errorMessage = error
    }
  }

  function cd() {
    loadDirectory(currentPath.substring(0, currentPath.lastIndexOf('/')))
  }

  async function loadMedia(path: string) {
    media = Media.create(path)
  }
</script>

{#if errorMessage}
  <p class:errorMessage>{errorMessage}</p>
{/if}

{#if currentPath}
  <p class:currentPath>{currentPath}</p>
  <button on:click={cd}>Back</button>
{/if}

{#if files}
  <p style="color: red">HOLLA {files.length} Chika</p>
  {#each files as file}
    {#if file.type === 'directory'}
      <button class="directory" on:click={(e) => loadDirectory(file.uri)}>
        <span class="material-icons md-30">folder</span>
        {file.name}
      </button>
    {:else}
      <button class="file" on:click={(e) => loadMedia(file.uri)}>{file.name}</button>
    {/if}
  {/each}
{/if}

{#if media}
  <button on:click={(e) => media.play()}>Play</button>
  <button on:click={(e) => media.pause()}>Pause</button>
{/if}

<style>
  .currentPath {
    word-break: break-all;
  }
  .errorMessage {
    color: red;
    font-weight: bold;
  }
</style>
