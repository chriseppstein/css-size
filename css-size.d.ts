export = cssSize;


declare function cssSize(
  css: string,
  options: cssSize.ProcessOptions,
  processor?: cssSize.Processor
): Promise<cssSize.Result>;

declare namespace cssSize {
  function table(
    css: string,
    options: ProcessOptions,
    processor?: Processor
  ): Promise<string>;
  interface HasCss {
    css: string;
  }
  interface ProcessOptions {
    [opt: string]: any;
  }
  type Processor = (css: string, options: ProcessOptions) => Promise<HasCss>;

  /**
   * The size before and after, the absolute different and the percent improvement.
   */
  interface SizeInfo {
    original: string;
    processed: string;
    difference: string;
    percent: string;
  }

  /**
   *  Size deltas of the css in various formats.
   */
  interface Result {
    uncompressed: SizeInfo;
    gzip: SizeInfo;
    brotli: SizeInfo;
  }
}