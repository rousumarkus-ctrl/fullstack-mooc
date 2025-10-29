import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Todo from './Todo';

describe('Single todo component', () => {
  let comp;
  let del;
  beforeEach(() => {
    comp = vi.fn();
    del = vi.fn();
    render(
      <Todo
        todo={{ text: 'Test', done: false }}
        onClickComplete={comp}
        onClickDelete={del}
      ></Todo>
    );
  });
  afterEach(() => {
    cleanup();
  });
  test('Contains text', () => {
    expect(screen.getByText('Test')).toBeDefined();
  });
  test('Delete called', () => {
    const button = screen.getByText('Delete');
    fireEvent.click(button);
    expect(del).toHaveBeenCalledTimes(1);
    expect(del).toHaveBeenCalledWith({ text: 'Test', done: false });
  });
  test('Complete called', () => {
    const button = screen.getByText('Set as done');
    fireEvent.click(button);
    expect(comp).toHaveBeenCalledTimes(1);
    expect(comp).toHaveBeenCalledWith({ text: 'Test', done: false });
  });
});
