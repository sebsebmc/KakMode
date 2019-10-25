import { RegisterAction } from './base';
import { BaseMovement, IMovement } from './baseMotion';
import { VimState } from '../state/vimState';
import { ModeName, Mode } from '../mode/mode';
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
  ): Promise<Position | IMovement> {
    // TODO: we want to stop before the newline char to match kakoune behaviour exactly
    position = position.getRightThroughLineBreaks();
    while (position.isLineEnd() && !position.isAtDocumentEnd()) {
      position = position.getRightThroughLineBreaks(true);
    }
    // use getLeftThroughLineBreaks to back up to the previous line
    return { start: position, stop: position.getWordRight().getLeftThroughLineBreaks() };
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
export class MoveWordBack extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['b'];

  // select preceding whitespaces and the word on the left of selection end
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position | IMovement> {
    // TODO: skip through line breaks ('w' also needs this fix)
    position = position.getLeftThroughLineBreaks();
    while (position.isLineEnd() && !position.isAtDocumentBegin()) {
      position = position.getLeftThroughLineBreaks();
    }
    // use getLeftThroughLineBreaks to back up to the previous line
    return { start: position, stop: position.getWordLeft() };
  }
}

@RegisterAction
export class MoveWordBackExtend extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['B'];

  // select preceding whitespaces and the word on the left of selection end
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position | IMovement> {
    // TODO: skip through line breaks ('w' also needs this fix)
    position = position.getLeftThroughLineBreaks();
    while (position.isLineEnd() && !position.isAtDocumentBegin()) {
      position = position.getLeftThroughLineBreaks();
    }
    // use getLeftThroughLineBreaks to back up to the previous line
    return position.getWordLeft();
  }
}

@RegisterAction
export class MoveWordEnd extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['e'];

  // select preceding whitespaces and the word on the right of selection end
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position | IMovement> {
    // TODO: need to strip empty lines at the back
    return { start: position.getRightThroughLineBreaks(), stop: position.getCurrentWordEnd() };
  }
}

@RegisterAction
export class MoveWordEndExtend extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['E'];

  // select preceding whitespaces and the word on the right of selection end
  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position | IMovement> {
    // TODO: need to strip empty lines at the back
    return position.getCurrentWordEnd();
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
  ): Promise<IMovement> {
    return { start: position.getDocumentBegin(), stop: position.getDocumentEnd() };
  }
}

@RegisterAction
export class ReduceSelection extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = [';'];

  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<IMovement> {
    return { start: position, stop: position };
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
  ): Promise<IMovement> {
    if (position.isLineEnd()) {
      position = position.getNextLineBegin();
    }
    return { start: position.getLineBegin(), stop: position.getLineEndIncludingEOL() };
  }
}

@RegisterAction
export class SelectLineExtend extends BaseMovement {
  modes = [ModeName.KakNormal];
  keys = ['X'];

  public async execAction(
    position: Position,
    vimState: VimState,
    isLastIteration: boolean = false
  ): Promise<Position> {
    if (position.isLineEnd()) {
      position = position.getNextLineBegin();
    }
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
