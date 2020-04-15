attribute vec2 a_position;
uniform vec2 u_offset;
// uniform mat2 u_rot;
void main() {
    vec2 p = a_position + u_offset;
    gl_position = (p,0,1);
}