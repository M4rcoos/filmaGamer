export interface IVideoInfo {
  codigo: number;
  result: [
    {
      NomArena: string;
      NomQuadra: string;
      DatUpload: string;
      DatProcessado: string;
      DatHora: string;
      HorarioVideoFrame: string;
      play: string;
      Frame: string;
      NomExibicao: string;
    }
  ];
}