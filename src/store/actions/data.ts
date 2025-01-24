import { createAction } from '@reduxjs/toolkit';
import { Post } from '../../types/post';

export const setContents = createAction<Post[]>('data/setContents');
