// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
// https://github.com/movingbrands/svelte-portable-text
import BlockContent from '@movingbrands/svelte-portable-text';

import Link from './Link.svelte'
import AbbrTag from './AbbrTag.svelte'
import AudioObject from './AudioObject.svelte'
import BibleTag from './BibleTag.svelte'
import FootnoteTag from './FootnoteTag.svelte'
import ImageObject from './ImageObject.svelte'
import VideoObject from './VideoObject.svelte'
import LangTag from './LangTag.svelte'
import ChartBlock from './ChartBlock.svelte'
import BlockQuote from './BlockQuote.svelte'
import QuoteTag from './QuoteTag.svelte'
import MapBlock from './MapBlock.svelte'
import PageBreakTag from './PageBreakTag.svelte'

export default {
  marks: {
    abbrTag: ({ children, mark }) => ({
      component: AbbrTag,
      childNodes: children,
      props: mark,
    }),
    bibleTag: ({ children, mark }) => ({
      component: BibleTag,
      childNodes: children,
      props: {
        book: mark.book,
        chapter: mark.chapter,
        verse: mark.verse,
        verseEnd: mark.verseEnd
      },
    }),
    footnote: ({ children, mark }) => ({
      component: FootnoteTag,
      childNodes: children,
      props: {
        mark: mark
      }
    }),
    internalLink: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: {
        href: `/en/${mark.type}/${mark.slug}`
      },
    }),
    langTag: ({ children, mark }) => ({
      component: LangTag,
      childNodes: children,
      props: {
        lang: mark.lang
      }
    }),
    link: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: mark,
    }),
    pageBreak: ({ children, mark }) => ({
      component: PageBreakTag,
      childNodes: children,
      props: mark,
    }),
    quoteTag: ({ children, mark }) => ({
      component: QuoteTag,
      childNodes: children,
      props: {
        cite: mark.source
      }
    })
  },
  types: {
    audioObject: ({ node, children }) => {
      return ({
      component: AudioObject,
      childNodes: children,
      props: {
        embed: node.embed
      },
    })},
    imageObject: ({ node, children }) => {
      return ({
      component: ImageObject,
      childNodes: children,
      props: {
        image: node.embed.file,
        caption: node.caption
      },
    })},
    newspaperArticleObject: ({ node, children }) => {
      //Move this funky math stuff into the image function,
      //Since I already have some math stuff for ratio there.
      let image = node.embed.file
      let hotspot = image.hotspot
      let dimensions= image.asset.metadata.dimensions
      return ({
        component: ImageObject,
        childNodes: children,
        props: {
          image: image,
          caption: node.caption,
          ratio: {
            x: dimensions.width * hotspot.width,
            y: dimensions.height * hotspot.height
          },
          source: node.embed
        },
      })
    },
    videoObject: ({ node, children }) => {
      return ({
      component: VideoObject,
      childNodes: children,
      props: {
        embed: node.embed
        //url: node.url,
        //startTime: node.startTime,
        //endTime: node.endTime,
        //caption: node.caption,
      },
    })},
    chartBlock: ({ node, children }) => {
      return ({
        component: ChartBlock,
        childNodes: children,
        props: {
          data: {
            labels: node.labels,
            datasets: node.datasets
          },
          title: node.title,
          type: node.type
        }
      })
    },
    blockQuoteObject: ({ node, children }) => {
      return ({
        component: BlockQuote,
        childNodes: children,
        props: {
          source: node.source,
          text: node.text
        }
      })
    },
    mapObject: ({ node, children }) => {
      return ({
        component: MapBlock,
        childNodes: children,
        props: {
          map: node.embed,
          caption: node.caption
        }
      })
    }
  }
};
