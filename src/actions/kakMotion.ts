import { RegisterAction } from "./base";
import { BaseMovement } from "./baseMotion";
import { VimState } from "../state/vimState";
import { ModeName, Mode } from "../mode/mode";
import { Position } from '../common/motion/position';

@RegisterAction
export class MoveWordBegin extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['w'];

  // Select the word and following whitespaces on the right of selection end (does not go past newline)
  // We include the character we are on unless we are at the end of a line
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position> {
    // if (position.isWordChar()) {
    //   position = position.getRightThroughLineBreaks();
    // }
    // In Kakoune if the next position was the newline, it starts with on the next line
    // if (next.isLineEnd()) {
    //   next = next.getRightThroughLineBreaks();
    // }
    vimState.cursorStartPosition = position;

    // If in whitespace, we go until the next `word` char

    return position.getWordRight().getLeft();
  }
}

@RegisterAction
export class ExtendWordBegin extends MoveWordBegin {
  modes = [ModeName.KakNormal];
  keys = ['W'];
  kakModeExtends = true;

  // Select the word and following whitespaces on the right of selection end (does not go past newline)
  // We include the character we are on unless we are at the end of a line
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position> {
    return position.getWordRight().getLeft();
  }
}

@RegisterAction
export class SelectBuffer extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['%'];

  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position> {
    vimState.cursorStartPosition = position.getDocumentBegin();
    return position.getDocumentEnd();
  }
}

@RegisterAction
export class SelectLine extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['x'];

  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position> {
    if (position.isLineEnd()) {
      position = position.getNextLineBegin();
    }
    vimState.cursorStartPosition = position.getLineBegin();
    return position.getLineEndIncludingEOL();
  }
}

// @RegisterAction
// export class name extends BaseMovement {
//   modes = [ModeName.KakNormal];
//   keys = [];
//   public async execAction(
//     position: Position,
//     vimState: VimState,
//     isLastIteration: boolean = false
//   ): Promise<Position> {
//     return
//   }
// }