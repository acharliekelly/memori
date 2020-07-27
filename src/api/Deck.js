

/**
 * Shape of the Deck object
 * TODO: create Mongoose schema
 */
const Deck = () => ({
  _id: 'colors',
  get id() { return this._id; },
  set id(value) { this._id = value; },
  _title: 'Colors',
  get title() {
    return this._title
  },
  set title(value) {
    this._title = value;
  },
  _hasImages: false,
  get hasImages() { return this._hasImages; },
  set hasImages(value) { this._hasImages = value; },
  _imgWidth: 60,
  get imgWidth() {
    return this._imgWidth;
  },
  set imgWidth(value) {
    this._imgWidth = value;
  },
  _background: "#fff",
  get background() {
    return this._background;
  },
  set background(value) {
    this._background = value;
  },
  _cardBack: "#000",
  get cardBack() {
    return this._cardBack;
  },
  set cardBack(value) {
    this._cardBack = value;
  },
  _faces: [
    // default values ('colors' faces)
    "#600", "#c00", "#060", "#0c0", "#006", "#00c",
    "#660", "#6c0", "#cc0", "#c60", "#066", "#06c",
    "#0c6", "#0cc", "#606", "#c0c", "#60c", "#c06"
  ],
  get faces() {
    return this._faces;
  },
  set faces(value) {
    this._faces = value;
  },
  _showText: false,
  get showText() {
    return this._showText;
  },
  set showText(value) {
    this._showText = value;
  },
  _cardStyle: {
    // default settings
    fontSize: '16px',
    color: "#000",
    width: '3vw',
    height: '3vw'
  },
  get cardStyle() {
    return this._cardStyle;
  },
  set cardStyle(value) {
    this._cardStyle = value;
  },
});

export default Deck;