export interface ChartType {
  targetId: string;
  size: {
    width: number;
    height: number;
    font: number;
  };
  datas: ChartDataType[];
  labels: string[];
  backgroundColor?: string;
  hoverCardBackgroundColor?: string;
  zoom?: boolean;
  showDataCount?: number;
  showLabelCount?: number;
}

type DrawMode = "dotted" | "area" | "line";

export interface ChartDataType {
  // 데이터들의 라벨
  label: string;
  // 데이터 리스트
  data: number[];
  // 데이터들의 최소 값
  min: number;
  // 데이터들의 최대 값
  max: number;
  // 사용자 지정 색깔
  customColor?: () => {
    border?: HTMLElement | Element;
    legend?: HTMLElement | Element;
  };
  // border 사용자 지정 색깔 ID(Defs의 ID 값)
  borderCustomColorId?: string;
  // 기본 color
  color?: string;
  // area chart의 배경 색상
  areaColor?: string;
  // 차트 라인의 두께
  width: number;
  // 차트를 어떻게 그릴지에 대한 상태 값
  drawMode: DrawMode;
}

export interface ChartPaddingType {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export interface AttributeType {
  property: string;
  value: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface GradientColor {
  offset: string;
  stopColor: string;
}

export class Chart {
  // SVG Container
  private chart: SVGSVGElement;
  private labelContainer: SVGSVGElement;
  private customColorContainer: SVGSVGElement;
  private datasContainer: SVGSVGElement;
  private legendContainer: SVGSVGElement;
  private guideLineContainer: SVGSVGElement;
  private axiosContainer: SVGSVGElement;
  private mouseEventAreaContainer: SVGSVGElement;
  private hoverGuidLineContainer: SVGSVGElement;
  private hoverPointsContainer: SVGSVGElement;

  // HTML Container
  private hoverCardContainer: HTMLElement; // 차트에 호버 시 생성되는 Info Card의 컨테이너
  private controlBarContainer: HTMLElement; // 컨트롤 바의 컨테이너
  private datePickContainer: HTMLElement; // 데이트 피커의 컨테이너

  private svgNs: string = "http://www.w3.org/2000/svg";

  private targetId: string;

  // layout
  private width: number;
  private hegiht: number;
  private fontSize: number;
  private padding: ChartPaddingType = { bottom: 0, left: 0, top: 0, right: 0 };

  private datas: ChartDataType[];
  private labels: string[]; // x축에서 표현되는 라벨들

  private xAxisCount: number; // x축에서 표현되는 라벨의 개수
  private yAxisCount: number = 10; // y축에서 표현되는 라벨의 개수

  private maxChartDataCount: number; // 차트 데이터 개수 중 가장 큰 수

  private maxDataForDatas: number = 0; // 데이터 중 가장 큰 값
  private minDataForDatas: number = 0; // 데이터 중 가장 작은 값
  private maxData: number = 0; // y축에서 표현되는 가장 큰 수 (maxDataForDatas - 평균 값)
  private minData: number = 0; // y축에서 표현되는 가장 작은 수 (minDataForDatas - 평균 값)

  private defaultColor: string = "#fff"; // data Line의 기본 색상
  private backgrondColor?: string; // Chart 배경 색상

  private zoom: boolean = false; // 줌인, 줌 아웃 기능 추가 여부
  private zoomCount: number = 5; // 줌인, 줌 아웃을 할 때 변동되는 데이터 개수
  private showDataCount: number = 0; // 화면에 보여줄 데이터 개수 (zoom 모드에서만 사용하는 변수)
  private showLabelCount: number = 0; // 화면에 보여줄 라벨 개수 (zoom 모드에서만 사용하는 변수)

  private guidLineColor: string = "#797979"; // chart의 가이드 라인의 색상
  private guidLineWidth: string = ".5px"; // chart의 가이드 라인의 두께

  // interaction toggle
  private isMouseHover: boolean = false;

  constructor(data: ChartType) {
    const {
      datas,
      size,
      targetId,
      labels,
      backgroundColor,
      zoom = false,
      showDataCount,
      showLabelCount,
    } = data;
    this.targetId = targetId;
    this.width = size.width;
    this.hegiht = size.height;
    this.fontSize = size.font;
    this.backgrondColor = backgroundColor;
    this.datas = datas;
    this.labels = labels;
    this.xAxisCount = labels.length;
    this.maxChartDataCount = Math.max(...datas.map((data) => data.data.length));

    this.zoom = zoom;
    this.showDataCount = showDataCount ? showDataCount : this.maxChartDataCount;
    this.showLabelCount = showLabelCount ? showLabelCount : this.labels.length;

    // 줌인 줌 아웃 기능이 활성화 여부가 결정된 이후에 실행시켜야 함
    this.setMinMaxData();

    this.chart = this.createSvgElement("svg", [
      { property: "id", value: "flowbit_svg" },
      { property: "xmlns", value: "http://www.w3.org/2000/svg" },
      { property: "viewBox", value: `0 0 ${this.width} ${this.hegiht}` },
      { property: "style", value: "position: relative" },
    ]);

    if (this.backgrondColor)
      this.chart.style.backgroundColor = this.backgrondColor;
    this.chart.style.display = "block";
    this.getTarget()?.appendChild(this.chart);

    this.labelContainer = this.createSvgElement("g");
    this.customColorContainer = this.createSvgElement("g");
    this.datasContainer = this.createSvgElement("g");
    this.legendContainer = this.createSvgElement("g");
    this.guideLineContainer = this.createSvgElement("g");
    this.axiosContainer = this.createSvgElement("g");
    this.mouseEventAreaContainer = this.createSvgElement("g");
    this.hoverGuidLineContainer = this.createSvgElement("g");
    this.hoverPointsContainer = this.createSvgElement("g");

    this.hoverCardContainer = document.createElement("div");
    this.controlBarContainer = document.createElement("div");
    this.datePickContainer = document.createElement("div");
  }

  /**
   * SVG 태그가 생성되는 부모 태그를 구하는 함수
   * @returns {HTMLElement} SVG 태그가 생성되는 부모 태그 반환
   */
  private getTarget() {
    return document.getElementById(this.targetId);
  }

  /**
   * 문자열을 HTML Element로 변환하는 함수
   * @param {string} str HTML로 변환할 문자열
   * @param {classList?: string[], id: string} param1 생성되는 HTML에 적용할 class와 id 값
   * @returns
   */
  private stringToHTML(
    str: string,
    option?: { classList?: string[]; id?: string },
  ) {
    const dom = document.createElement("div");
    if (option !== undefined) {
      const { classList, id } = option;
      if (classList) {
        classList.forEach((item) => {
          dom.classList.add(item);
        });
      }
      id && dom.setAttribute("id", id);
    }
    dom.innerHTML = str;
    return dom;
  }

  /**
   * SVG 태그에 생성되는 문자의 길이를 구하는 함수
   * @param {string} text 길이를 조회할 문자
   * @returns {number} 문자의 길이 값
   */
  private getTextLength(text: string) {
    const element = this.createSvgElement("text");
    element.append(text);
    return this.getBBox(element).width;
  }

  /**
   * Svg Element의 좌표(x, y) 및 크기(width, height)을 구하는 함수
   * @param {SVGSVGElement} element DOM Rect 정보를 확인할 SVGSVGElement
   * @returns {DOMRect} SVG Element의 위치 및 크기 값
   */
  private getBBox(element: SVGSVGElement): DOMRect {
    this.appendToChart(element);
    return element.getBBox();
  }

  /**
   * Element의 속성들을 지정하는 함수
   * @param {SVGSVGElement} element 속성을 지정할 Element 매개변수
   * @param {AttributeType[]} attributes 지정될 속성들인 매개변수 [{ property: string, value: string }]
   */
  private setAttributes(
    element: SVGSVGElement | Element,
    attributes: AttributeType[],
  ) {
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.property, attribute.value);
    });
  }

  /**
   * 사용자가 따로 지정한 Color(Gradient 등)를 지정하는 함수
   * @param colorSvgElement
   * @param position
   * @param gradientUnits
   * @returns {string} Defs에 지정된 Color ID 값
   */
  // private setCustomColor(
  //   colorSvgElement: SVGSVGElement | HTMLElement | Element,
  //   position: { x1: string; y1: string; x2: string; y2: string } = {
  //     x1: "",
  //     y1: "",
  //     x2: "",
  //     y2: "",
  //   },
  //   gradientUnits: "userSpaceOnUse" | "objectBoundingBox" = "objectBoundingBox",
  // ) {
  //   const randomId = "flowbit_" + Math.random().toString(16);
  //   if (gradientUnits === "userSpaceOnUse") {
  //     this.setAttributes(colorSvgElement, [
  //       { property: "gradientUnits", value: gradientUnits },
  //       { property: "id", value: randomId },
  //       { property: "x1", value: position.x1 },
  //       { property: "x2", value: position.x2 },
  //       { property: "y1", value: position.y1 },
  //       { property: "y2", value: position.y2 },
  //     ]);
  //   } else {
  //     this.setAttributes(colorSvgElement, [
  //       { property: "gradientUnits", value: gradientUnits },
  //       { property: "id", value: randomId },
  //     ]);
  //   }

  //   this.customColorContainer.append(colorSvgElement);

  //   return randomId;
  // }

  /**
   * SVG Element을 생성하는 함수
   * @param {string} svgTag 생성할 SVG Tag 이름인 매개변수
   * @param {AttributeType[]} attributes 만들어진 SVG Tag에 적용될 속성들인 매개변수 [{ property: string, value: string }]
   * @returns {SVGSVGElement} 생성된 SVG Tag를 반환
   */
  private createSvgElement(
    svgTag: string,
    attributes?: AttributeType[],
  ): SVGSVGElement {
    const newTag = document.createElementNS(
      this.svgNs,
      svgTag,
    ) as SVGSVGElement;
    if (attributes !== undefined) {
      this.setAttributes(newTag, attributes);
    }
    return newTag;
  }

  /**
   * 부모 Element에 자식 Element들을 추가하는 함수
   * @param {SVGSVGElement | Element} parent
   * @param {SVGSVGElement[] | Element[]} childs
   * @returns
   */
  private appendChilds(
    parent: SVGSVGElement | Element,
    childs: SVGSVGElement[] | Element[],
  ) {
    childs.forEach((child) => parent.appendChild(child));
  }

  /**
   * Chart에 자식 Element를 추가하는 함수
   * @param {SVGSVGElement | Element} child Chart에 추가할 Element
   */
  private appendToChart(child: SVGSVGElement | Element) {
    this.chart.appendChild(child);
  }

  /**
   * Y 라벨에 표시되는 최대 값 최소 값 범위를 설정하는 함수
   * @param max Y 라벨에 표시되는 최대 값
   * @param min Y 라벨에 표시되는 최소 값
   */
  private setMinMaxData() {
    if (this.zoom) {
      // 줌인 줌 아웃 기능 활성화 시에 사용됨
      // Set min, max data for datas
      const newMaxList: number[] = [];
      const newMinList: number[] = [];

      this.datas.forEach((_) => {
        const { data } = _;
        const startIndex = this.maxChartDataCount - this.showDataCount;
        newMinList.push(Math.min(...data.slice(startIndex)));
        newMaxList.push(Math.max(...data.slice(startIndex)));
      });
      // Set average of the range of min and max
      this.maxDataForDatas = Math.max(...newMaxList);
      this.minDataForDatas = Math.min(...newMinList);
    } else {
      this.maxDataForDatas = Math.max(...this.datas.map((data) => data.max));
      this.minDataForDatas = Math.min(...this.datas.map((data) => data.min));
    }

    const averageOfMinMax =
      (this.maxDataForDatas - this.minDataForDatas) / this.yAxisCount;

    this.maxData = this.maxDataForDatas + averageOfMinMax;
    this.minData = this.minDataForDatas - averageOfMinMax;
  }

  /**
   * Chart의 Padding(상하좌우)를 설정하는 함수
   */
  private setSVGPadding = () => {
    const textLength = this.getTextLength(this.maxData + "");

    this.padding = {
      ...this.padding,
      // mix font-size and datas.length
      bottom: this.fontSize * 5,
      // top: this.fontSize * 5 + this.datas.length * 25,
      top: this.fontSize * 7,
      left: 20,
      right: textLength * 1.5,
    };
  };

  /**
   * SVG 기본 값을 설정하는 함수
   */
  private setSVGElement = () => {
    // Create Custom Color Def Container For Chart
    this.customColorContainer = this.createSvgElement("defs", [
      { property: "class", value: "customColor" },
    ]);

    // Create Legend Container For Chart
    this.legendContainer = this.createSvgElement("g");

    // Create Axios Container For Chart
    this.axiosContainer = this.createSvgElement("g");

    // Create Label Container For Chart
    this.labelContainer = this.createSvgElement("g", [
      { property: "fill", value: "#666666" },
      { property: "font-size", value: this.fontSize + "px" },
      { property: "class", value: "labels" },
      { property: "text-anchor", value: "end" },
    ]);

    // Create Data Container For Chart
    this.datasContainer = this.createSvgElement("g");

    // Create Guide Line Container For Chart
    this.guideLineContainer = this.createSvgElement("g");

    // Creat Hover guideLine Container For Chart
    this.hoverGuidLineContainer = this.createSvgElement("path", [
      { property: "d", value: "" },
      { property: "stroke", value: this.guidLineColor },
      { property: "stroke-width", value: this.guidLineWidth },
      { property: "visibility", value: "hidden" },
      { property: "id", value: "flowbit_hoverLine" },
    ]);

    // Create Hover Data Point(Circle) Container For Chart
    this.hoverPointsContainer = this.createSvgElement("g", [
      { property: "id", value: "flowbit_hoverPoint" },
      { property: "visibility", value: "hidden" },
    ]);
    this.datas.forEach((_, i) => {
      const point = this.createSvgElement("circle", [
        { property: "id", value: `flowbit_hoverPoint${i}` },
        { property: "cx", value: "1" },
        { property: "cy", value: "1" },
        { property: "r", value: "5" },
        { property: "fill", value: `${this.backgrondColor}` },
        { property: "stroke-width", value: "2" },
        { property: "stroke", value: "#fff" },
      ]);

      this.appendChilds(this.hoverPointsContainer, [point]);
    });

    // Create Mouse Event Area Container For Chart
    this.mouseEventAreaContainer = this.createSvgElement("rect", [
      { property: "x", value: `${this.padding.left}` },
      { property: "y", value: `${this.padding.top}` },
      {
        property: "width",
        value: `${this.width - this.padding.right - this.padding.left}`,
      },
      {
        property: "height",
        value: `${this.hegiht - this.padding.bottom - this.padding.top}`,
      },
      {
        property: "id",
        value: "flowbit_eventArea",
      },
    ]);
    this.mouseEventAreaContainer.style.cursor =
      'url("https://www.bithumb.com/react/charting_library/sta…es/crosshair.6c091f7d5427d0c5e6d9dc3a90eb2b20.cur"),crosshair';
    this.mouseEventAreaContainer.style.opacity = "0";

    // set control bar layout
    const controlBarString = `
      <style>
      .flowbit-control-bar {
        position: absolute;
        transform: translate(-50%, -300%);
        left: 50%;
        bottom: 0;
        display: flex;
        gap: 24px;
        z-index: 1;
      }
      .flowbit-control-bar__wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .flowbit-control-bar__btn {
        width: 32px;
        height: 32px;
        border: 1px solid #c1c1c1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
      }
      </style>
      <div class="flowbit-control-bar">
        <div class="flowbit-control-bar__wrapper">
          <button id="flowbit-control-bar-minus" class="flowbit-control-bar__btn">
            <img src="/Minus.svg" alt="">
          </button>
          <button id="flowbit-control-bar-plus" class="flowbit-control-bar__btn">
            <img src="/Plus.svg" alt="">
          </button>
          <button id="flowbit-control-bar-reset" class="flowbit-control-bar__btn">
            <img src="/ArrowCounterClockwise.svg" alt="">
          </button>
        </div>
      </div>
    `;
    const controlBarHtml = this.stringToHTML(controlBarString);
    this.controlBarContainer.appendChild(controlBarHtml);

    // set date pick layout
    const datePickString = `
    <style>
      .flowbit-date-pick-bar {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        border-radius: 30px;
        background-color: #E8E9EC;
      }
      .flowbit-date-pick-bar__list {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .flowbit-date-pick-bar__item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .flowbit-date-pick-bar__btn {
        padding: 9px 24px;
        background: none;
        border: none;
        cursor: pointer;
        
        font-size: 14px;
        line-height: 22px;
        color: #424242;

        box-sizing: border-box;
      }
      .flowbit-date-pick-bar__radio:checked + .flowbit-date-pick-bar__btn {
        border-radius: 30px;
        background-color: white;
        border: 1px solid #0056CA;
        color: #0056CA;
      }
    </style>
    <div id="flowbit-date-pick-bar" class="flowbit-date-pick-bar">
      <ul class="flowbit-date-pick-bar__list">
        <li class="flowbit-date-pick-bar__item">
          <input id="flowbit-date-pick2" class="flowbit-date-pick-bar__radio"
            name="flowbit-date-pick" type="radio" class="flowbit-date-pick-bar__radio" hidden checked>
          <label for="flowbit-date-pick2" class="flowbit-date-pick-bar__btn"
          data-count="14">2주</label>
        </li>
        <li class="flowbit-date-pick-bar__item">
          <input id="flowbit-date-pick3" class="flowbit-date-pick-bar__radio"
            name="flowbit-date-pick" type="radio" class="flowbit-date-pick-bar__radio" hidden>
          <label for="flowbit-date-pick3" class="flowbit-date-pick-bar__btn"
          data-count="30">1개월</label>
        </li>
        <li class="flowbit-date-pick-bar__item">
          <input id="flowbit-date-pick4" class="flowbit-date-pick-bar__radio"
            name="flowbit-date-pick" type="radio" class="flowbit-date-pick-bar__radio" hidden>
          <label for="flowbit-date-pick4" class="flowbit-date-pick-bar__btn selected"
          data-count="180">6개월</label>
        </li>
      </ul>
    </div>
    `;
    const datePickHtml = this.stringToHTML(datePickString);
    this.datePickContainer.appendChild(datePickHtml);

    this.appendToChart(this.customColorContainer);
    this.appendToChart(this.labelContainer);
    this.appendToChart(this.legendContainer);
    this.appendToChart(this.guideLineContainer);
    this.appendToChart(this.datasContainer);
    this.appendToChart(this.hoverGuidLineContainer);
    this.appendToChart(this.hoverPointsContainer);
    this.appendToChart(this.axiosContainer);
    this.appendToChart(this.mouseEventAreaContainer);

    this.getTarget()?.appendChild(this.hoverCardContainer);
    this.getTarget()?.appendChild(this.controlBarContainer);
    this.getTarget()?.appendChild(this.datePickContainer);

    // Set HTML Animation
    document
      .getElementById("flowbit-control-bar-minus")
      ?.addEventListener("click", () => {
        this.setZoom(true);
      });
    document
      .getElementById("flowbit-control-bar-plus")
      ?.addEventListener("click", () => {
        this.setZoom(false);
      });
    document
      .getElementById("flowbit-control-bar-reset")
      ?.addEventListener("click", () => {
        this.reRender();
      });
    document
      .getElementById("flowbit-date-pick-bar")
      ?.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        if (!target) return;
        if (target.tagName !== "LABEL") return;

        const newShowCount: number = Number(target.dataset.count);

        this.showDataCount = this.showLabelCount * newShowCount;

        // 차트 데이터의 최대 최소 값 재설정
        this.setMinMaxData();

        // 차트 라벨 다시 그리기
        document.getElementById("flowbit_label")?.remove();
        this.setLabel();

        // 재조정 된 데이터 다시 셋팅
        document.getElementById("flowbit_datas")?.remove();
        this.drawGraphLine();
      });
  };

  /**
   * X축 Y축 선을 긋는 함수
   */
  // private setAxis = () => {
  //   // 1. Create G Tag
  //   const Axis = this.createSvgElement("g", [
  //     { property: "class", value: "axis" },
  //     { property: "stroke", value: "#fff" },
  //     { property: "stroke-width", value: "5" },
  //     { property: "id", value: "flowbit_axios" },
  //   ]);

  //   // 2. Draw X Axis
  //   const xAxis = this.createSvgElement("line", [
  //     { property: "x1", value: this.padding.left + "" },
  //     { property: "x2", value: this.width - this.padding.right + "" },
  //     { property: "y1", value: this.hegiht - this.padding.bottom + "" },
  //     { property: "y2", value: this.hegiht - this.padding.bottom + "" },
  //     { property: "class", value: "axis__x" },
  //   ]);

  //   // 3. Draw Y Axis
  //   const yAxis = this.createSvgElement("line", [
  //     { property: "x1", value: this.padding.left + "" },
  //     { property: "x2", value: this.padding.left + "" },
  //     { property: "y1", value: this.padding.top + "" },
  //     { property: "y2", value: this.hegiht - this.padding.bottom + "" },
  //     { property: "class", value: "axis__y" },
  //   ]);

  //   // insert To C
  //   this.appendChilds(Axis, [xAxis, yAxis]);
  //   this.appendChilds(this.axiosContainer, [Axis]);
  // };

  /**
   * X, Y축의 라벨을 설정하는 함수
   */
  private setLabel = () => {
    const gTagForLabel = this.createSvgElement("g", [
      { property: "id", value: "flowbit_label" },
    ]);

    const gTagOfXLabel = this.createSvgElement("g", [
      { property: "text-anchor", value: "middle" },
    ]);
    const gTagOfYLabel = this.createSvgElement("g", [
      { property: "id", value: "flowbit_yLabel" },
      { property: "dominant-baseline", value: "central" },
      { property: "text-anchor", value: "start" },
    ]);

    const gapFromAxiosAndLabel = 35; // 축과 라벨의 사이 값

    // x label
    if (this.zoom) {
      // 줌인 줌 아웃 모드일 경우
      const increment =
        this.showLabelCount > this.showDataCount
          ? 1
          : Math.ceil(this.showDataCount / this.showLabelCount);
      for (let i = 0; i < this.showDataCount; i += increment) {
        const x =
          (i / (this.showDataCount - 1)) *
            (this.width - this.padding.left - this.padding.right) +
          this.padding.left;
        const y = this.hegiht - this.padding.bottom + gapFromAxiosAndLabel;
        const text = this.createSvgElement("text", [
          { property: "x", value: x + "" },
          { property: "y", value: y + "" },
        ]);

        // TODO labels 위치 변경
        text.append(this.labels[this.xAxisCount - this.showDataCount + i]);
        gTagOfXLabel.appendChild(text);
      }
    } else {
      this.labels.forEach((label, i) => {
        const x =
          (i / (this.xAxisCount - 1)) *
            (this.width - this.padding.left - this.padding.right) +
          this.padding.left;
        const y = this.hegiht - this.padding.bottom + gapFromAxiosAndLabel;

        const text = this.createSvgElement("text", [
          { property: "x", value: x + "" },
          { property: "y", value: y + "" },
        ]);

        text.append(label);

        gTagOfXLabel.appendChild(text);
      });
    }

    // y label
    for (let i = 0; i <= this.yAxisCount; i++) {
      // X 좌표 생성
      const x = this.width - this.padding.right + gapFromAxiosAndLabel;

      // Y 좌표 생성
      const y =
        (this.hegiht - this.padding.bottom - this.padding.top) *
          (i / this.yAxisCount) +
        this.padding.top;

      // 텍스트 생성
      const label = Math.floor(
        ((this.yAxisCount - i) / this.yAxisCount) *
          (this.maxData - this.minData) +
          this.minData,
      );
      const text = this.createSvgElement("text");
      text.append(label.toLocaleString("ko-KR"));

      this.setAttributes(text, [
        { property: "x", value: x + "" },
        { property: "y", value: y + "" },
      ]);

      gTagOfYLabel.appendChild(text);
    }

    this.appendChilds(gTagForLabel, [gTagOfXLabel, gTagOfYLabel]);
    this.appendChilds(this.labelContainer, [gTagForLabel]);
  };

  /**
   * Chart의 가이드 라인을 그리는 함수
   */
  private setGuideLine = () => {
    const gTagOfLine = this.createSvgElement("g", [
      { property: "class", value: "guideLine" },
      { property: "stroke", value: "#dddddd" },
      { property: "stroke-width", value: "0.5px" },
    ]);

    // x축 가이드 라인
    for (let i = 0; i <= this.yAxisCount; i++) {
      const x1 = this.padding.left;
      const x2 = this.width - this.padding.right;
      const y =
        (this.hegiht - this.padding.bottom - this.padding.top) *
          (i / this.yAxisCount) +
        this.padding.top;

      const line = this.createSvgElement("line", [
        { property: "x1", value: x1 + "" },
        { property: "x2", value: x2 + "" },
        { property: "y1", value: y + "" },
        { property: "y2", value: y + "" },
      ]);

      gTagOfLine.appendChild(line);
    }

    this.appendChilds(this.guideLineContainer, [gTagOfLine]);
  };

  /**
   * 그래프에 원을 그리는 함수
   * @param {SVGSVGElement} canvas  화면에 그릴 캔버스
   * @param {Coordinate} coordinate 원이 그려질 좌표 값
   * @param {string} color          원의 색상 값
   */
  private drawCircle = (
    canvas: SVGSVGElement,
    coordinate: Coordinate,
    color: string,
  ) => {
    // 접점의 좌표 값(coordinates[0])
    const contactPoint = this.createSvgElement("circle", [
      { property: "cx", value: coordinate.x + "" },
      { property: "cy", value: coordinate.y + "" },
      { property: "r", value: "6" },
      { property: "stroke", value: color },
      { property: "stroke-width", value: "2" },
      { property: "fill", value: "white" },
    ]);

    this.appendChilds(canvas, [contactPoint]);
  };

  /**
   * 데이터의 값을 통해서 화면에 보여줄 좌표 값을 구하는 함수
   * @param {number} data 화면에 표시할 데이터
   * @param {number} curIndex 데이터를 담고 있는 리스트의 인덱스
   * @returns {Coordinate} 좌표 값
   */
  private calculateLineChartCoordinateFromData(
    data: number,
    curIndex: number,
  ): Coordinate {
    // 배열의 인덱스를 가지고 x좌표 값을 구함
    const x =
      (curIndex / (this.showDataCount - 1)) *
        (this.width - this.padding.left - this.padding.right) +
      this.padding.left;

    // 배열 값을 가지고 y좌표 값을 구함
    const y =
      this.hegiht -
      this.padding.top -
      this.padding.bottom -
      (this.hegiht - this.padding.bottom - this.padding.top) *
        ((data - this.minData) / (this.maxData - this.minData)) +
      this.padding.top;
    return {
      x,
      y,
    };
  }

  /**
   * 데이터 리스트에 있는 값들을 통해 좌표 리스트로 매핑하는 함수
   * @param {number[]} data 화면에 표시할 데이터 리스트
   * @param {number} limitDataCount 화면에 보여줄 데이터 개수를 제한하는 변수
   * @returns {Coordinate[]} 차트에 표시할 좌표 리스트
   */
  private mapDatasToCoordinates = (
    data: number[],
    limitDataCount: number,
  ): Coordinate[] => {
    const coordinates: Coordinate[] = [];

    // 가장 긴 데이터 리스트와의 길이 차이
    const diff = this.maxChartDataCount - data.length;

    for (
      let j = data.length - this.showDataCount + diff + limitDataCount;
      j < data.length;
      j++
    ) {
      // 배열의 인덱스를 가지고 x좌표 값을 구함
      const { x, y } = this.calculateLineChartCoordinateFromData(
        data[j],
        j - (data.length - this.showDataCount + diff),
      );

      coordinates.push({ x, y });
    }
    return coordinates;
  };

  /**
   * SVG Linear 그라데이션 색상 태그 생성하는 함수
   */
  private createLinearGradient = (
    gradientColorList: GradientColor[],
  ): string => {
    const gradientId = "flowbit-id-" + new Date().getTime();
    const linearGradientTag = this.createSvgElement("linearGradient", [
      { property: "id", value: gradientId + "" },
      { property: "gradientTransform", value: "rotate(90)" },
    ]);
    gradientColorList.forEach((v) => {
      const linearGradientStop = this.createSvgElement("stop", [
        { property: "offset", value: v.offset },
        { property: "stop-color", value: v.stopColor },
      ]);

      this.appendChilds(linearGradientTag, [linearGradientStop]);
    });

    this.appendChilds(this.customColorContainer, [linearGradientTag]);

    return gradientId;
  };

  /**
   * Chart의 데이터 라인을 그리는 함수
   */
  private drawGraphLine = () => {
    // make g container`
    const gTagOfPath = this.createSvgElement("g", [
      { property: "id", value: "flowbit_datas" },
    ]);
    gTagOfPath.classList.add("datas");

    // 화면에 노출한 데이터 개수
    let showedDataCount = 0;

    // Draw Graph Line
    for (let i = 0; i < this.datas.length; i++) {
      const {
        data,
        width,
        color = this.defaultColor,
        drawMode,
        areaColor = "rgba(0, 86, 202, 0.16)",
      } = this.datas[i];

      // 데이터를 통해 차트 좌표 값 구하기
      let coordinates: Coordinate[];
      if (this.isMouseHover) {
        coordinates = this.mapDatasToCoordinates(data, 0);
      } else {
        coordinates = this.mapDatasToCoordinates(data, showedDataCount);
      }

      // 좌표 값을 SVG 경로로 변경한 데이터를 담는 변수
      const svgPathFromCoordinates: string[] = [];

      coordinates.forEach((v, i) => {
        if (i == 0) svgPathFromCoordinates.push(`M ${v.x} ${v.y} `);
        else svgPathFromCoordinates.push(`L ${v.x} ${v.y}`);
      });

      const defaultOptions = [
        { property: "stroke", value: color },
        { property: "d", value: svgPathFromCoordinates.join(" ") },
        { property: "fill", value: "none" },
        { property: "stroke-width", value: width + "" },
        { property: "stroke-linecap", value: "round" },
        { property: "stroke-linejoin", value: "round" },
      ];

      switch (drawMode) {
        case "line":
          // drawMode가 Line일 경우 stroke 옵션을 사용해 선 색상 부여
          break;
        case "area":
          const areaGradientColor = this.createLinearGradient([
            { offset: "0", stopColor: areaColor },
            { offset: "1", stopColor: "rgba(255, 255, 255, 0)" },
          ]);

          // drawMode가 area일 경우 새로운 path 태그를 만들고 fill 옵션을 사용해 area 색상 부여
          // area 차트의 좌표 값 생성
          const areaPointList = [...svgPathFromCoordinates];
          areaPointList.push(`V ${this.hegiht - this.padding.bottom}`);
          areaPointList.push(`H ${coordinates[0].x}`);
          const areaPath = this.createSvgElement("path", [
            { property: "d", value: areaPointList.join(" ") },
            { property: "fill", value: `url(#${areaGradientColor})` },
          ]);

          this.appendChilds(gTagOfPath, [areaPath]);

          break;
        case "dotted":
          // 속성 값
          // drawMode가 dotted일 경우 stroke-dasharray 옵션을 사용해 점선을 생성하고 stroke 옵션을 사용해 선 색상 부여
          defaultOptions.push({
            property: "stroke-dasharray",
            value: "13",
          });
          break;
        default:
          throw new Error("can't find drawMode, your drawMode is " + drawMode);
      }

      // draw polylines
      const path = this.createSvgElement("path", defaultOptions);

      this.appendChilds(gTagOfPath, [path]);

      // 서로 다른 데이터의 접점을 그림
      if (i > 0) {
        const contactCoordinate = this.calculateLineChartCoordinateFromData(
          data[data.length - this.showDataCount + showedDataCount],
          showedDataCount,
        );
        this.drawCircle(gTagOfPath, contactCoordinate, color);
      }

      // 현재까지 보여준 데이터 개수 갱신
      showedDataCount +=
        this.showDataCount - (this.maxChartDataCount - data.length) - 1;
    }
    this.appendChilds(this.datasContainer, [gTagOfPath]);
  };

  /**
   * Chart의 Legend를 설정하는 함수
   */
  private setLegend = () => {
    const legendHeight = 50;
    const lineWidth = 50;
    const gap = 24;
    const fontSize = 12;

    // legend 사이의 갭들을 나타내는 변수
    let accGap = 0;

    const gTagOfLegend = this.createSvgElement("g", [
      { property: "class", value: `legend` },
    ]);

    for (let i = 0; i < this.datas.length; i++) {
      const data = this.datas[i];
      const { label, drawMode } = data;

      // Get text position
      const x = this.padding.left;
      const y = this.padding.top - legendHeight;

      const line = this.createSvgElement("line", [
        { property: "x1", value: `${x + accGap}` },
        { property: "y1", value: `${y}` },
        { property: "x2", value: `${x + lineWidth + accGap}` },
        { property: "y2", value: `${y}` },
        {
          property: "stroke",
          value: `${this.datas[i].color}`,
        },
        { property: "stroke-width", value: `2px` },
        drawMode === "dotted"
          ? {
              property: "stroke-dasharray",
              value: "7",
            }
          : { property: "stroke-dasharray", value: "0" },
      ]);

      accGap += gap;

      const text = this.createSvgElement("text", [
        { property: "font-size", value: `${fontSize}` },
        { property: "fill", value: `#616161` },
        { property: "x", value: `${x + lineWidth + accGap}` },
        { property: "y", value: `${y}` },
        { property: "dominant-baseline", value: "middle" },
      ]);
      text.append(label);
      const bbox = this.getBBox(text);
      const textLength = bbox.width;

      accGap += gap + lineWidth + textLength;

      this.appendChilds(gTagOfLegend, [text, line]);
    }
    this.appendChilds(this.legendContainer, [gTagOfLegend]);
  };

  /**
   * showDataCount값에 새로운 값을 누적하는 함수
   * @param {number} acc showDataCount에 적용할 숫자
   */
  private accShowedDataCount = (acc: number) => {
    this.showDataCount += acc;
  };

  /**
   * Chart의 Zoom 기능을 설정하는 함수
   * @param {boolean} isIn zoom in인지 out인지 판단하는 변수
   */
  private setZoom = (isIn: boolean) => {
    if (isIn) {
      // TODO 줌인 할 때의 조건 변경 필요
      if (this.showDataCount < this.maxChartDataCount - 5) {
        this.accShowedDataCount(this.zoomCount);
      }
    } else {
      if (this.showDataCount > this.zoomCount * 2) {
        this.accShowedDataCount(-this.zoomCount);
      }
    }

    // 차트 데이터의 최대 최소 값 재설정
    this.setMinMaxData();

    // 차트 라벨 다시 그리기
    document.getElementById("flowbit_label")?.remove();
    this.setLabel();

    // 재조정 된 데이터 다시 셋팅
    document.getElementById("flowbit_datas")?.remove();
    this.drawGraphLine();
  };

  /**
   * Chart의 마우스 휠 기능을 설정하는 함수
   * @param {WheelEvent} e MouseWheelEvent
   */
  private setMouseWheelAction = (e: WheelEvent) => {
    e.preventDefault();
    // 데이터 범위 재조정
    if (e.deltaY > 0) {
      // Scroll Up
      this.setZoom(true);
    } else {
      // Scroll Down
      this.setZoom(false);
    }
  };

  /**
   * Chart의 Mouse Hover 기능을 설정하는 함수
   * 마우스를 올린 지점에 데이터의 Info 창을 보여줌
   * @param {any} e 마우스 호버 이벤트 객체
   * @returns
   */
  private setMouseHoverAction = (e: MouseEvent) => {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const persent = mouseX / rect.width;

    // 마우스의 위치를 토대로 화면에 표시할 인덱스를 나타냄
    const index = Math.abs(Math.round((this.showDataCount - 1) * persent));

    const dataInfoList: {
      cur: number;
      prev: number;
      legend: string;
    }[] = [];

    // 2. Draw Hover line Like Y Axios Guidline
    const pathOfGuidLine = `M ${
      (index / (this.showDataCount - 1)) *
        (this.width - this.padding.left - this.padding.right) +
      this.padding.left
    },${this.padding.top} V${this.hegiht - this.padding.bottom}`;
    this.hoverGuidLineContainer.setAttribute("d", pathOfGuidLine);
    this.hoverGuidLineContainer.setAttribute("visibility", "visible");

    // 3. Set Pointer on the data line
    this.datas.forEach((_) => {
      const { data, label } = _;
      const diff = this.maxChartDataCount - data.length;
      const indexOfData = data.length - this.showDataCount + index + diff;

      // Todo 라이브러리 화를 고려하지 않고 특정 기능에만 작동되는 hover Card로 우선 개발됨
      // 추후 커스텀화를 고려해 코드를 수정해야 함, 우선 여기서는 실제 가격이 먼저 나옴
      dataInfoList.push({
        cur: data[indexOfData],
        prev: data[indexOfData - 1],
        legend: label,
      });
    });

    // 4. Pop info dialog for datas
    // 예측 성공 여부 확인
    let hoverCardString = "";
    if (dataInfoList[0].cur === undefined) {
      hoverCardString = `
      <style>
        .flowbit-hover-card {
          width: 256px;
          background-color: #fff;
          border-radius: 4px;
          border: 2px solid #eee;
          padding: 16px 20px;
          color: #9E9E9E;
          visibility: hidden;
          position: absolute;
          z-index: 2;
        }
        .flowbit-hover-card__title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .flowbit-hover-card__date {
          font-size: 16px;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__badge {
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__badge.red {
          color: #E74C4C;
        }
        .flowbit-hover-card__badge.green {
          color: #0056CA;
        }
        .flowbit-hover-card__contentList {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .flowbit-hover-card__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .flowbit-hover-card__content h2,
        .flowbit-hover-card__content h1 {
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__content h1 {
          color: #424242;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
        .flowbit-hover-card__content.gray h2 {
          color: #0056CA;
        }
      </style>
      <div>
        <div class="flowbit-hover-card__title">
          <h1 class="flowbit-hover-card__date">${
            this.labels[this.labels.length - this.showDataCount + index]
          }</h1>
          <span class="flowbit-hover-card__badge green">매수하세요</span>
        </div>
        <ul class="flowbit-hover-card__contentList">
          <li class="flowbit-hover-card__content">
            <h2>${dataInfoList[0].legend}</h2>
            <h2>-</h2>
          </li>
          <li class="flowbit-hover-card__content">
            <h2>${dataInfoList[1].legend}</h2>
            <h1>${dataInfoList[1].cur.toLocaleString()}</h1>
          </li>
        </ul>
      </div>
        `;
    } else {
      const isCorrect =
        (dataInfoList[0].prev - dataInfoList[0].cur) *
          (dataInfoList[0].prev - dataInfoList[1].cur) >
        0;
      hoverCardString = `
      <style>
        .flowbit-hover-card {
          width: 256px;
          background-color: #fff;
          border-radius: 4px;
          border: 2px solid #eee;
          padding: 16px 20px;
          color: #9E9E9E;
          visibility: hidden;
          position: absolute;
          z-index: 2;
        }
        .flowbit-hover-card__title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .flowbit-hover-card__date {
          font-size: 16px;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__badge {
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__badge.red {
          color: #E74C4C;
        }
        .flowbit-hover-card__badge.green {
          color: #0056CA;
        }
        .flowbit-hover-card__contentList {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .flowbit-hover-card__content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .flowbit-hover-card__content h2,
        .flowbit-hover-card__content h1 {
          font-size: 14px;
          font-weight: normal;
          letter-spacing: 2%;
        }
        .flowbit-hover-card__content h1 {
          color: #424242;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }
        .flowbit-hover-card__content.gray h2 {
          color: #0056CA;
        }
      </style>
      <div>
        <div class="flowbit-hover-card__title">
          <h1 class="flowbit-hover-card__date">${
            this.labels[this.labels.length - this.showDataCount + index]
          }</h1>
          <span class="flowbit-hover-card__badge ${
            isCorrect ? "green" : "red"
          }">${isCorrect ? "예측 성공" : "예측 실패"}</span>
        </div>
        <ul class="flowbit-hover-card__contentList">
          <li class="flowbit-hover-card__content">
            <h2>${dataInfoList[0].legend}</h2>
            <h1>${dataInfoList[0].cur.toLocaleString()}</h1>
          </li>
          <li class="flowbit-hover-card__content">
            <h2>${dataInfoList[1].legend}</h2>
            <h1>${dataInfoList[1].cur.toLocaleString()}</h1>
          </li>
        </ul>
      </div>
        `;
    }

    // TODO 추후에는 카드를 매번 새롭게 만드는 것이 아닌 위치만 조정하는 것으로 코드를 변경하는 것이 좋음
    this.hoverCardContainer.remove();
    this.hoverCardContainer = this.stringToHTML(hoverCardString, {
      classList: ["flowbit-hover-card"],
    });

    this.getTarget()?.append(this.hoverCardContainer);

    // 마우스 Y 에서 차트 Y 빼면 댐
    // console.log(this.predict.getBoundingClientRect().y);

    this.hoverCardContainer.style.visibility = "visible";
    this.hoverCardContainer.style.top = `${e.offsetY + 20}px`;
    if (persent > 0.5) {
      this.hoverCardContainer.style.left = `${e.clientX - 10}px`;
      this.hoverCardContainer.style.translate = "-100%";
    } else {
      this.hoverCardContainer.style.left = `${e.clientX + 10}px`;
      this.hoverCardContainer.style.translate = "0";
    }
  };

  /**
   * Chart의 Interaction 기능을 설정하는 함수
   */
  private setInteraction = () => {
    // Make Interaction Area

    // Set Scroll Event
    // Zoom in, out 기능
    if (this.zoom) {
      this.mouseEventAreaContainer.addEventListener(
        "mousewheel",
        (e: Event) => {
          const wheelEvent = e as WheelEvent;
          this.setMouseWheelAction(wheelEvent);
          this.hoverGuidLineContainer.setAttribute("visibility", "hidden");
          this.hoverPointsContainer.setAttribute("visibility", "hidden");
          this.hoverCardContainer.style.visibility = "hidden";
        },
      );
    }

    // Set Mouse Hover Event
    this.mouseEventAreaContainer.addEventListener("mousemove", (e) => {
      this.setMouseHoverAction(e);
      this.isMouseHover = true;

      // 재조정 된 데이터 다시 셋팅
      document.getElementById("flowbit_datas")?.remove();
      this.drawGraphLine();
    });

    this.mouseEventAreaContainer.addEventListener("mouseleave", () => {
      this.hoverGuidLineContainer.setAttribute("visibility", "hidden");
      this.hoverPointsContainer.setAttribute("visibility", "hidden");
      this.hoverCardContainer.style.visibility = "hidden";
      this.isMouseHover = false;

      // 재조정 된 데이터 다시 셋팅
      document.getElementById("flowbit_datas")?.remove();
      this.drawGraphLine();
    });
  };

  /**
   * C
   */
  public reRender = () => {
    this.showDataCount = 14;
    // 차트 데이터의 최대 최소 값 재설정
    this.setMinMaxData();
    // 차트 라벨 다시 그리기
    document.getElementById("flowbit_label")?.remove();
    // Draw X and Y Label
    this.setLabel();
    // 재조정 된 데이터 다시 셋팅
    document.getElementById("flowbit_datas")?.remove();
    // 데이터 구축
    this.drawGraphLine();
  };

  /**
   * Chart를 그리는 함수
   */
  public render = () => {
    // Set SVG Padding
    this.setSVGPadding();

    // Set SVG Container
    this.setSVGElement();

    // Draw X and Y Label
    this.setLabel();

    // Draw Legend
    this.setLegend();

    // Draw GuideLine
    this.setGuideLine();

    // 데이터 구축
    this.drawGraphLine();

    // Draw X and Y Axis
    // this.setAxis();

    // Set Interaction
    this.setInteraction();
  };
}
