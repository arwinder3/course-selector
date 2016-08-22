export function getAllCourses() {
    return fetch("http://localhost:3000/catalog/courses")
        .then(response => response.json());
}
