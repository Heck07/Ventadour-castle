import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export default {
  mounted(el) {
    const createViewer = () => {
      if (el.viewerInstance) {
        el.viewerInstance.destroy()
      }
      el.viewerInstance = new Viewer(el, {
        toolbar: true,
        title: false,
        navbar: false,
        tooltip: true,
        fullscreen: true,
        transition: true,
        zIndex: 9999,
        filter(image) {
          return !image.classList.contains('no-zoom')
        }
      })
    }

    // Initialisation de Viewer après que le DOM est prêt
    requestAnimationFrame(() => {
      createViewer()
    })

    // Met à jour Viewer quand le contenu change (nouvelle route, images dynamiques, etc.)
    el._observer = new MutationObserver(() => {
      createViewer()
    })

    el._observer.observe(el, {
      childList: true,
      subtree: true
    })
  },

  unmounted(el) {
    if (el.viewerInstance) {
      el.viewerInstance.destroy()
      el.viewerInstance = null
    }
    if (el._observer) {
      el._observer.disconnect()
      el._observer = null
    }
  }
}
