// Quelle: docs/INHALTE.md §3 (Dornröschen); Credits aus dem Trailer (D-042).
import { defineProject } from '~/types/project'

export default defineProject({
  slug: 'dornroeschen',
  title: { en: 'Sleeping Beauty', de: 'Dornröschen' },
  subtitle: { en: 'Music dance theatre after Tchaikovsky', de: 'Musiktanztheater nach Tschaikowsky' },
  venue: 'Philharmonie Luxembourg',
  year: 2026,
  pillar: 'create',
  role: { en: 'Direction', de: 'Regie' },
  tags: { en: ['Dance', 'Tchaikovsky', 'New format'], de: ['Tanz', 'Tschaikowsky', 'Neues Format'] },
  cover: {
    type: 'video',
    src: '/media/dornroeschen/cover.mp4',
    poster: '/media/dornroeschen/cover-poster.jpg',
    alt: {
      en: 'Scenes from Sleeping Beauty: dancers and singers in colourful costumes in front of the orchestra.',
      de: 'Szenen aus Dornröschen: Tänzer:innen und Sänger:innen in bunten Kostümen vor dem Orchester.',
    },
    width: 800,
    height: 1000,
    credit: 'Trailer: Philharmonie Luxembourg',
  },
  intro: {
    en: [
      'A music dance theatre production built around Tchaikovsky’s score for Sleeping Beauty, bringing dance and staged narration together for the Philharmonie Luxembourg.',
      'Choreography is by Mariana Souza, with musical direction by Sasha Scolnik-Brower.',
    ],
    de: [
      'Ein Musiktanztheater rund um Tschaikowskys Partitur zu Dornröschen, das Tanz und szenisches Erzählen für die Philharmonie Luxembourg zusammenbringt.',
      'Die Choreografie stammt von Mariana Souza, das Dirigat übernimmt Sasha Scolnik-Brower.',
    ],
  },
  gallery: [
    {
      type: 'single',
      label: { en: 'Stage', de: 'Bühne' },
      media: {
        type: 'image',
        src: '/media/dornroeschen/01.jpg',
        alt: {
          en: 'The stage in front of the orchestra: a long banquet table, the royal court and a dancer in white.',
          de: 'Die Bühne vor dem Orchester: eine lange Festtafel, der Hofstaat und eine Tänzerin in Weiß.',
        },
        width: 2400,
        height: 1500,
        credit: 'Inês Rebelo de Andrade',
      },
    },
    {
      type: 'group-3',
      label: { en: 'Scenes', de: 'Szenen' },
      media: [
        {
          type: 'image',
          src: '/media/dornroeschen/02a.jpg',
          alt: {
            en: 'The conductor raises his arms above a sleeping princess and an old woman spreading her arms.',
            de: 'Der Dirigent hebt die Arme über der schlafenden Prinzessin und einer alten Frau, die die Arme ausbreitet.',
          },
          width: 1200,
          height: 1500,
          credit: 'Inês Rebelo de Andrade',
        },
        {
          type: 'image',
          src: '/media/dornroeschen/02b.jpg',
          alt: {
            en: 'A tent covered in painted roses stands in blue light in front of the orchestra.',
            de: 'Ein mit Rosen bemaltes Zelt steht in blauem Licht vor dem Orchester.',
          },
          width: 1200,
          height: 1500,
          credit: 'Inês Rebelo de Andrade',
        },
        {
          type: 'image',
          src: '/media/dornroeschen/02c.jpg',
          alt: {
            en: 'Curtain call: the whole cast and orchestra on the stage of the Philharmonie.',
            de: 'Schlussapplaus: das ganze Ensemble mit Orchester auf der Bühne der Philharmonie.',
          },
          width: 1200,
          height: 1500,
          credit: 'Inês Rebelo de Andrade',
        },
      ],
    },
    {
      type: 'single',
      label: { en: 'The court', de: 'Der Hofstaat' },
      media: {
        type: 'image',
        src: '/media/dornroeschen/04.jpg',
        alt: {
          en: 'Performers in colourful costumes gather excitedly around an old woman in a floral dress on stage.',
          de: 'Darsteller:innen in bunten Kostümen drängen sich aufgeregt um eine alte Frau im geblümten Kleid auf der Bühne.',
        },
        width: 2400,
        height: 1500,
        credit: 'Inês Rebelo de Andrade',
      },
    },
    {
      type: 'single',
      label: { en: 'The rose tent', de: 'Das Rosenzelt' },
      media: {
        type: 'image',
        src: '/media/dornroeschen/03.jpg',
        alt: {
          en: 'Dancers in front of the rose tent, the orchestra in blue light behind them.',
          de: 'Tänzer:innen vor dem Rosenzelt, dahinter das Orchester in blauem Licht.',
        },
        width: 2400,
        height: 1500,
        credit: 'Inês Rebelo de Andrade',
      },
    },
  ],
  videos: [{ provider: 'youtube', id: 'z7sEa5xDJAg', title: { en: 'Sleeping Beauty', de: 'Dornröschen' } }],
  credits: [
    { role: { en: 'Concept & direction', de: 'Konzept & Regie' }, name: 'Anisha Bondy' },
    { role: { en: 'Concept & choreography', de: 'Konzept & Choreografie' }, name: 'Mariana Souza' },
    { role: { en: 'Musical direction', de: 'Musikalische Leitung' }, name: 'Sasha Scolnik-Brower' },
    { role: { en: 'Text & dramaturgy', de: 'Text & Dramaturgie' }, name: 'Sabrina Zwach' },
    { role: { en: 'Set', de: 'Bühne' }, name: 'Isabelle Kaiser' },
    { role: { en: 'Costumes', de: 'Kostüme' }, name: 'Saskia Theis' },
    { role: { en: 'Orchestra', de: 'Orchester' }, name: 'Luxembourg Philharmonic' },
    {
      role: { en: 'Cast', de: 'Mit' },
      name: 'Corinna Kirchhoff, Annick Schadeck, Mathilde Braun, Antony Franz, Inka Löwendorf, Florian Anderer, Prince Mihai, Anastasia Corker',
    },
  ],
  awards: [],
  press: [],
  featured: true,
  order: 7,
  todos: {
    en: ['Exact premiere date'],
    de: ['Genaues Premierendatum'],
  },
})
